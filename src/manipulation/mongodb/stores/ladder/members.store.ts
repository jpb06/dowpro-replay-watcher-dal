import { GenericStore } from '../dal.generic.store';
import { Member } from '../../../../types/persisted.types';

export abstract class MembersStore {
    public static storeName = 'members';

    public static async add(
        member: Member
    ): Promise<boolean> {
        let result = await GenericStore.createOrUpdate(this.storeName, {}, member);

        return result;
    }

    public static async getAll(): Promise<Array<Member>> {
        let result = await GenericStore.getAll(this.storeName) as Array<Member>;

        return result;
    }

    public static async getByName(
        name: string
    ): Promise<Member | undefined> {
        let result = await GenericStore.getBy(
            this.storeName,
            { Name: name },
            {}
        ) as Array<Member>;

        if (result.length === 0)
            return undefined;
        if (result.length > 1)
            throw new Error(`Several members have been found for name ${name}`);

        return result[0];
    }

    public static async getTopElo(
        count: number
    ): Promise<Member> {
        let result = await GenericStore.getBy(
            this.storeName,
            {}, // all
            { EloRating: -1 },
            count
        ) as Array<Member>;

        return result[0];
    }

}