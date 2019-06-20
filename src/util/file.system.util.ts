import * as fs from 'fs-extra';

export abstract class FileSystem {

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
}