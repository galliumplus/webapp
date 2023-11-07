import type { GalliumApi } from '..'
import type { GalliumUserApi } from '../users';
import RestService from '@/services/rest';
import { GalliumUserService } from './users';
import { Session } from '@/logic/users'

export class GalliumService extends RestService implements GalliumApi {
    public async login(userId: string, password: string): Promise<Session> {
        throw new Error('Method not implemented.');
    }

    public get users(): GalliumUserApi {
    	return new GalliumUserService(this);
    }
}