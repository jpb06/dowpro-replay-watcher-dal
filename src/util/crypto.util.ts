import * as bcrypt from 'bcrypt';

export abstract class Crypto {

    public static async hash(
        data: string
    ): Promise<string> {
        let salt = await bcrypt.genSalt(12);
        let hash = await bcrypt.hash(data, salt);

        return hash;
    }

    public static async verify(
        data: string,
        hash: string
    ): Promise<boolean> {

        let result = await bcrypt.compare(data, hash);

        return result;
    }
}