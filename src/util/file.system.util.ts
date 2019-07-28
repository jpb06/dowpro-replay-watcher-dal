import * as fs from 'fs-extra';
import { GameResult } from './../types/persisted.types';
import { validateGameResult } from './../types/persisted.types.validation';

export abstract class Util {

    public static async findRecFile(
        folderPath: string
    ): Promise<string | undefined> {

        let files = await fs.readdir(folderPath);

        let recFiles = files.filter(el => el.endsWith('.rec'));

        if (recFiles.length > 1) {
            return undefined;
        }

        return recFiles[0];
    }

    public static async readResult(
        filePath: string
    ): Promise<GameResult | undefined> {

        let raw: any = await fs.readJSON(filePath);

        if (validateGameResult(raw)) return raw as GameResult;
        return undefined;
    }
}