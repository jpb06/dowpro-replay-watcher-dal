import { GamePlayer, Member } from "./persisted.types";

export enum Status {
    Success,
    UnableToUnzip,
    UnableToLocateRecFile,
    UnableToComputeFileHash,
    AlreadyExistinginGamesStore,
    UnableToParseRecFile,
    UnableToParseJsonResultFile,
    ResultsDoNotMatch,
    InvalidPlayersCount
}

export class AlreadyExistingGameData {
    dateAdded: string;
    mapName: string;
    mod: string;
    players: Array<AlreadyExistingGamePlayer>;
}
export class AlreadyExistingGamePlayer {
    name: string;
    race: string;
    isAmongWinners: boolean;
}

export class ArchiveHandlingResult {
    status: Status;
    errorMessage: string;
    playersStats: Array<GamePlayer & Member>;
    hash: string;
    mapName: string;
    duration: number;
    modName: string;
    modVersion: string;
    alreadyExistingGameData: AlreadyExistingGameData | undefined;

    constructor(
        status: Status,
        message: string,
        hash: string, 
        alreadyExistingGameData?: AlreadyExistingGameData
    ) {
        this.status = status;
        this.errorMessage = message;
        this.playersStats = [];
        this.hash = hash;
        this.mapName = '';
        this.duration = 0;
        this.modName = '';
        this.modVersion = '';
        this.alreadyExistingGameData = alreadyExistingGameData;
    }
}
