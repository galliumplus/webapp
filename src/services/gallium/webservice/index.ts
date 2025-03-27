import type { GalliumApi, GalliumClientsApi, GalliumUsersApi } from '..'
import { GalliumRolesService, GalliumUsersService } from './users'
import {
  BasicAuth,
  BearerToken,
  number,
  object,
  type ObjectDescriptor,
  type Service,
  service,
  string
} from '@hokaze/core'
import dayjs from '@hokaze/dayjs'
import { type LoggedIn, LoginCredentials } from '@/business/access'
import type { SsoClientPublicInfo } from '@/business/apps'
import { useStore } from '@/composables/store'
import type { GalliumRolesApi } from '@/services/gallium/users'
import { GalliumErrorHandler } from '@/services/gallium/webservice/errors.ts'
import { GalliumClientsService } from '@/services/gallium/webservice/clients.ts'

const ssoCredentials = object({
  username: string,
  password: string,
  application: string
})

const loggedInThroughSso = object({
  jwt: string,
  redirectUrl: string,
  fullRedirectUrl: string
})

const ssoClientPublicInfo: ObjectDescriptor<SsoClientPublicInfo> = object({
  displayName: string,
  logoUrl: string.nullable,
  scope: number
})

export class GalliumService implements GalliumApi {
  private readonly _loginService: Service
  private readonly _mainService: Service
  private readonly _rolesService: GalliumRolesService
  private readonly _usersService: GalliumUsersService
  private readonly _clientsService: GalliumClientsService
  private readonly _apiKey: string

  public constructor(baseUrl: string, apiKey: string) {
    this._apiKey = apiKey

    // service sans authentification
    this._loginService = service({ baseUrl, badResponseHandler: new GalliumErrorHandler(false) })

    // service avec authentification par token
    this._mainService = service({ baseUrl, badResponseHandler: new GalliumErrorHandler(true) })
    const store = useStore()
    if (store.session.isLoggedIn) {
      this._mainService.useAuth(new BearerToken(store.session.token))
    }

    this._rolesService = new GalliumRolesService(this._mainService)
    this._usersService = new GalliumUsersService(this._mainService, this._rolesService)
    this._clientsService = new GalliumClientsService(this._mainService)
  }

  public async logIn(credentials: LoginCredentials): Promise<LoggedIn> {
    return await this._loginService
      .postRequest({
        path: 'login',
        response: object({
          token: string,
          expiration: dayjs,
          user: this._usersService.descriptor,
          permissions: number
        })
      })
      .withHeaders({ 'X-Api-Key': this._apiKey })
      .withAuth(new BasicAuth(credentials.username, credentials.password))
      .send()
  }

  public async getSsoPublicInfo(apiKey: string): Promise<SsoClientPublicInfo> {
    return await this._loginService
      .getRequest({ path: 'clients/sso-public/' + apiKey, response: ssoClientPublicInfo })
      .send()
  }

  public async ssoLogIn(apiKey: string, credentials: LoginCredentials): Promise<string> {
    const dto = await this._loginService
      .postRequest({ path: 'same-sign-on', request: ssoCredentials, response: loggedInThroughSso })
      .withHeaders({
        'X-Api-Key': this._apiKey
      })
      .send({ application: apiKey, username: credentials.username, password: credentials.password })
    return dto.fullRedirectUrl
  }

  public get users(): GalliumUsersApi {
    return this._usersService
  }

  public get roles(): GalliumRolesApi {
    return this._rolesService
  }

  public get clients(): GalliumClientsApi {
    return this._clientsService
  }
}
