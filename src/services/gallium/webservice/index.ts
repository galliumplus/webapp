import type { GalliumApi, GalliumClientsApi, GalliumUsersApi } from '..'
import { GalliumUserService, user } from './users'
import { type LoggedIn, LoginCredentials } from '@/business/access'
import { GalliumClientsService } from '@/services/gallium/webservice/clients'
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
import { GalliumPermissions, User } from '@/business/users'
import { useStore } from '@/composables/store'
import { ErrorCode, Problem } from '@/business/problem'
import router from '@/router'
import type { SsoClientPublicInfo } from '@/business/clients'

const loggedIn = object({
  token: string,
  expiration: dayjs,
  user,
  permissions: number
})

const ssoClientPublicInfo: ObjectDescriptor<SsoClientPublicInfo> = object({
  displayName: string,
  logoUrl: string.nullable,
  scope: number
})

export class GalliumService implements GalliumApi {
  private _loginService: Service
  private readonly _mainService: Service
  private _apiKey: string

  public constructor(baseUrl: string, apiKey: string) {
    this._apiKey = apiKey

    this._loginService = service(baseUrl)

    this._mainService = service({ baseUrl, badResponseHandler: this })
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
      permissions: new GalliumPermissions(dto.permissions)
    }
  }

  public async getSsoPublicInfo(apiKey: string): Promise<SsoClientPublicInfo> {
    return await this._loginService
      .getRequest({ path: 'clients/sso-public/' + apiKey, response: ssoClientPublicInfo })
      .send()
  }

  public ssoLogIn(apiKey: string, credentials: LoginCredentials): Promise<string> {
    throw 'Method not implemented.'
  }

  public get users(): GalliumUsersApi {
    return new GalliumUserService(this._mainService)
  }

  public get clients(): GalliumClientsApi {
    return new GalliumClientsService(this._mainService)
  }

  public onBadResponse(response: Response): Response {
    if (response.status === 401) {
      const store = useStore()
      store.session.clear()

      const currentRouteName = router.currentRoute.value.name
      let logInDestination
      if (currentRouteName !== null && typeof currentRouteName === 'string') {
        logInDestination = currentRouteName
      }
      router.push({ name: 'login', query: { to: logInDestination, disconnected: 'yes' } })

      throw new Problem(
        "Le jeton d'authentification semble ne plus être valide.",
        ErrorCode.Unauthenticated
      )
    } else {
      throw response
    }
  }
}
