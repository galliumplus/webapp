import type { GalliumApi, GalliumUserApi, GalliumClientApi } from '..'
import RestService from '@/services/rest'
import GalliumUserService from './users'
import GalliumClientsService from './clients'
import type { Session, LoginCredentials } from '@/logic/users'

export class GalliumService extends RestService implements GalliumApi {
  public logIn(credentials: LoginCredentials): Promise<Session> {
    throw 'Method not implemented.'
  }

  ssoLogIn(apiKey: string, credentials: LoginCredentials): Promise<string> {
    throw 'Method not implemented.'
  }

  public get users(): GalliumUserApi {
    return new GalliumUserService(this)
  }

  public get clients(): GalliumClientApi {
    return new GalliumClientsService(this)
  }
}
