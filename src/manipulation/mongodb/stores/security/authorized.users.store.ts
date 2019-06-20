import * as moment from 'moment';

import { GenericStore } from './../dal.generic.store';
import { AuthorizedUser } from './../../../../types/persisted.types';

import { Crypto } from './../../../../util/crypto.util';

export abstract class AuthorizedUsersStore {
    public static storeName = 'authorizedusers';

    public static async create(
        guildId: string
    ): Promise<string> {
        let password: string = [...Array(8)].map(i => (~~(Math.random() * 36)).toString(36)).join('');

        let hash = await Crypto.hash(password);

        await GenericStore.createOrUpdate(
            this.storeName,
            { login: guildId },
            { login: guildId, password: hash, dateGenerated: moment().toString() }
        );

        return password;
    }

    public static async get(
        guildId: string
    ): Promise<AuthorizedUser | undefined> {
        let result = await GenericStore.getBy(
            this.storeName,
            { login: guildId },
            {}
        ) as Array<AuthorizedUser>;

        if (result.length !== 1) return undefined;

        return result[0];
    }

    public static async getPermissions(
        login: string
    ): Promise<string[] | undefined> {
        let result = await GenericStore.getBy(
            this.storeName,
            { login: login },
            {}
        ) as Array<AuthorizedUser>;

        if (result.length !== 1) return undefined;

        return result[0].roles;
    }
}