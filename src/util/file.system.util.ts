import * as fs from 'fs-extra';
import * as crypto from 'crypto';
import { GameResult } from '../types/persisted.types';
import { validateGameResult } from '../types/persisted.types.validation';

export async function findRecFile(
    folderPath: string
): Promise<string | undefined> {

    let files = await fs.readdir(folderPath);

    let recFiles = files.filter(el => el.endsWith('.rec'));

    if (recFiles.length > 1) {
        return undefined;
    }

    return recFiles[0];
}

export async function readResult(
    filePath: string
): Promise<GameResult | undefined> {

    let raw: any = await fs.readJSON(filePath);

    if (validateGameResult(raw)) return raw as GameResult;
    return undefined;
}

export async function fileHash(
    filePath: string,
    algorithm = 'sha256'
): Promise<string | undefined> {

    return new Promise<string>(async (resolve, reject) => {
        let shasum = crypto.createHash(algorithm);
        try {
            let stream = fs.createReadStream(filePath);
            stream.on('data', (data) => {
                shasum.update(data);
            })
            // making digest
            stream.on('end', () => {
                const hash = shasum.digest('hex');
                return resolve(hash);
            })
        } catch (error) {
            return reject(undefined);
        }
    });
}