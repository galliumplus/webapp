import type { GalliumApi, GalliumUsersApi, GalliumClientsApi } from '..'
import { GalliumUserService, user } from './users'
import { LoginCredentials, type LoggedIn } from '@/business/access'
import { GalliumClientsService } from '@/services/gallium/webservice/clients'
import { BasicAuth, BearerToken, number, object, type Service, service, string } from '@hokaze/core'
import dayjs from '@hokaze/dayjs'
import { GalliumPermissions, User } from '@/business/users'
import { SessionStorage } from '@/store'

const loggedIn = object({
  token: string,
  expiration: dayjs,
  user,
  permissions: number
})

export class GalliumService implements GalliumApi {
  private _loginService: Service
  private _mainService: Service
  private _apiKey: string

  public constructor(baseUrl: string, apiKey: string) {
    this._apiKey = apiKey
    this._loginService = service(baseUrl)

    this._mainService = service(baseUrl)
    const store = new SessionStorage()
    if (store.loggedIn) {
      this._mainService.useAuth(new BearerToken(store.sessionToken))
    }
  }

  public async logIn(credentials: LoginCredentials): Promise<LoggedIn> {
    const dto = await this._loginService
      .postRequest({ path: 'login', response: loggedIn })
      .withHeaders({
        'X-Api-Key': this._apiKey
      })
      .withAuth(new BasicAuth(credentials.username, credentials.password))
      .send()
    return {
      token: dto.token,
      expiration: dto.expiration,
      user: new User(dto.user),
      permissions: new GalliumPermissions(dto.permissions)
    }
  }

  public ssoLogIn(apiKey: string, credentials: LoginCredentials): Promise<string> {
    throw 'Method not implemented.'
  }

  public get users(): GalliumUsersApi {
    return new GalliumUserService(this._mainService)
  }

  public get clients(): GalliumClientsApi {
    return new GalliumClientsService()
  }
}
