import { GenericStore } from './../dal.generic.store';
import { Game } from './../../../../types/persisted.types';

export abstract class GamesStore {
    public static storeName = 'games';

    public static async add(
        game: Game
    ): Promise<boolean> {
        let result = await GenericStore.create(this.storeName, game);

        return result;
    }

    public static async getAll(): Promise<Array<Game>> {
        let result = await GenericStore.getAll(this.storeName) as Array<Game>;

        return result;
    }

    public static async getByHash(
        hash: string
    ): Promise<Game> {
        let result = await GenericStore.getBy(
            this.storeName,
            { Hash: hash },
            {}
        ) as Array<Game>;

        return result[0];
    }

    public static async getByPlayer(
        name: string
    ): Promise<Game> {
        let result = await GenericStore.getBy(
            this.storeName,
            { "Result.Players.Name": name },
            {}
        ) as Array<Game>;

        return result[0];
    }

    public static async getByRace(
        race: string
    ): Promise<Game> {
        let result = await GenericStore.getBy(
            this.storeName,
            { "Result.Players.Race": race },
            {}
        ) as Array<Game>;

        return result[0];
    }
}