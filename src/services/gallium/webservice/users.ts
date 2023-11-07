import type { GalliumUserApi, PasswordModification } from '../users';
import RestService from '@/services/rest';
import {User} from '@/logic/users'

export class GalliumUserService extends RestService implements GalliumUserApi {
    public async getSelf(): Promise<User> {
        throw new Error('Method not implemented.');
    }

    public async changePassword(userId: string, passwordModification: PasswordModification): Promise<void> {
        await this.put(`users/${userId}/password`, passwordModification)
    }
}