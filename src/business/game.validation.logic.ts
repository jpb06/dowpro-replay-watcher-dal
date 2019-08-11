import * as fs from 'fs-extra';
import * as Unzip from 'node-unzipper';
import { RelicChunkyParser, Types as RelicChunkyTypes } from 'relic-chunky-parser';
import * as moment from 'moment';

import { GameResult, Game } from '../types/persisted.types';
import { ArchiveHandlingResult, Status, AlreadyExistingGameData } from '../types/business.types';
import * as FileSystem from '../util/file.system.util';
import { GamesStore } from '../manipulation/mongodb/stores/ladder/games.store';
import { setPlayersStats } from './ladder.logic';

export async function ReadGameResultArchive(
    uuid: string,
    archivePath: string,
    workingPath: string,
    gamesFolderPath: string

): Promise<ArchiveHandlingResult> {
    // Unzipping file in the provided temp directory
    let extraction: Unzip.Types.UnzipResult = await Unzip.Manipulation.unzip(archivePath, workingPath);
    if (!extraction.result) return new ArchiveHandlingResult(
        Status.UnableToUnzip, `Unable to unzip ${uuid}`, '');

    // Locating relic chunky file
    let recFile = await FileSystem.findRecFile(workingPath);
    if (recFile === undefined) return new ArchiveHandlingResult(
        Status.UnableToLocateRecFile, `Unable to locate replay file for ${uuid}`, '');

    // Getting relic chunky file hash
    let hash = await FileSystem.fileHash(`${workingPath}/${recFile}`);
    if (hash === undefined) return new ArchiveHandlingResult(
        Status.UnableToComputeFileHash, `Unable to compute file hash for ${uuid}`, '');

    // Checking if replay exists in db and therefore was already treated
    let exists = await GamesStore.getByHash(hash);
    if (exists) {
        let alreadyExistingGameData: AlreadyExistingGameData = {
            dateAdded: exists.DateAddedUTC,
            mapName: exists.Result.MapName,
            mod: `${exists.Result.ModName} ${exists.Result.ModVersion}`, 
            players: exists.Result.Players
                .map(el => { return { name: el.Name, race: el.Race, isAmongWinners: el.IsAmongWinners } })
        };

        await fs.remove(workingPath);
        return new ArchiveHandlingResult(
            Status.AlreadyExistinginGamesStore, `${hash}:${uuid} Already exists in db store`, hash, alreadyExistingGameData);
    }

    let gameFolderPath = `${gamesFolderPath}/${hash}`;

    let folderAlreadyExists = await fs.pathExists(gameFolderPath);
    if (folderAlreadyExists) {
        console.log(`Folder ${hash} already exists... Cleaning and copying uploaded files`);
        await fs.remove(gameFolderPath);
    }
    await fs.mkdir(gameFolderPath);

    await fs.move(`${workingPath}/${recFile}`, `${gameFolderPath}/${recFile}`);
    await fs.move(`${workingPath}/result.json`, `${gameFolderPath}/result.json`);

    // Reading json result
    let gameResult = await FileSystem.readResult(`${gameFolderPath}/result.json`);
    if (gameResult === undefined) {
        await fs.remove(gameFolderPath);
        return new ArchiveHandlingResult(
            Status.UnableToParseJsonResultFile, `Unable to parse json game result for ${gameFolderPath}`, hash);
    }
    gameResult.MapName = gameResult.MapName.toLowerCase();

    // Parsing relic chunky file
    let parsedResult = await RelicChunkyParser.getReplayData(`${gameFolderPath}/${recFile}`);
    if (parsedResult === undefined) return new ArchiveHandlingResult(
        Status.UnableToParseRecFile, `Unable to parse relic chunky file for ${hash}`, hash);

    // Checking if results are matching between json and relic chunky
    let isMatching = AreResultsMatching(gameResult, parsedResult);
    if (!isMatching) {
        await fs.remove(gameFolderPath);
        return new ArchiveHandlingResult(
            Status.ResultsDoNotMatch, `Results did not match for ${hash}`, hash);
    }

    // Should only treat 1vs1
    if (gameResult.PlayersCount !== 2) {
        await fs.remove(gameFolderPath);
        return new ArchiveHandlingResult(
            Status.InvalidPlayersCount, `Invalid players count for ${hash}`, hash);
    }

    let game: Game = {
        Hash: hash,
        Result: gameResult,
        DateAddedUTC: moment.utc().toString()
    };

    await GamesStore.add(game);

    let playersStats = await setPlayersStats(gameResult.Players[0], gameResult.Players[1]);

    return {
        status: Status.Success,
        errorMessage: '',
        playersStats: playersStats,
        hash: hash,
        mapName: gameResult.MapName,
        duration: gameResult.Duration,
        modName: parsedResult.modName,
        modVersion: gameResult.ModVersion,
        alreadyExistingGameData: undefined
    };
}

function AreResultsMatching(
    jsonResult: GameResult,
    relicChunkyResult: RelicChunkyTypes.MapData
): boolean {

    if (jsonResult.ModName !== relicChunkyResult.modName)
        return false;

    let relicChunkyPlayers = relicChunkyResult.players.filter(el => el.race.length !== 0);

    if (jsonResult.PlayersCount !== relicChunkyPlayers.length)
        return false;

    for (let i = 0; i < jsonResult.Players.length; i++) {

        if (relicChunkyPlayers.find(el => el.name === jsonResult.Players[0].Name) === undefined)
            return false;
    }

    let internalName = relicChunkyResult.internalName.substr(relicChunkyResult.internalName.lastIndexOf('\\') + 1);
    if (internalName.toLowerCase() !== jsonResult.MapName)
        return false;

    // This is not reliable
    console.log('duration in game file', relicChunkyResult.duration);
    console.log('duration in result json', jsonResult.Duration);
    //if (Math.round(relicChunkyResult.duration) !== jsonResult.Duration
    //    && Math.floor(relicChunkyResult.duration) !== jsonResult.Duration)
    //    return false;

    return true;
}