import type { GalliumApi, GalliumClientsApi, GalliumUsersApi } from '..'
import { client, generateNewAppAccessSecret, generateNewSameSignOnSecret } from './clients'
import { GalliumUsersService, role, user } from './users'
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
import { User } from '@/business/users'
import { useStore } from '@/composables/store'
import type { GalliumRolesApi } from '@/services/gallium/users'
import { GalliumErrorHandler } from '@/services/gallium/webservice/errors.ts'

const ssoCredentials = object({
  username: string,
  password: string,
  application: string
})

const loggedIn = object({
  token: string,
  expiration: dayjs,
  user,
  permissions: number
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
  private _apiKey: string

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
      permissions: dto.permissions
    }
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
    return new GalliumUsersService(this._mainService)
  }

  public get roles(): GalliumRolesApi {
    return this._mainService.collection('roles', role)
  }

  public get clients(): GalliumClientsApi {
    return Object.assign(this._mainService.collection('clients', client), {
      generateNewAppAccessSecret: generateNewAppAccessSecret(this._mainService),
      generateNewSameSignOnSecret: generateNewSameSignOnSecret(this._mainService)
    })
  }
}
