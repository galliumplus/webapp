import type { GalliumApi, GalliumClientsApi, GalliumUsersApi } from '..'
import { GalliumUserService, role, user } from './users'
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
import type { SsoClientPublicInfo } from '@/business/clients'
import { ErrorCode, Problem } from '@/business/problem'
import { User } from '@/business/users'
import { useStore } from '@/composables/store'
import router from '@/router'
import type { GalliumRolesApi } from '@/services/gallium/users'
import { GalliumClientsService } from '@/services/gallium/webservice/clients'

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
      permissions: dto.permissions
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

  public get roles(): GalliumRolesApi {
    return this._mainService.collection('roles', role)
  }

  public get clients(): GalliumClientsApi {
    return new GalliumClientsService(this._mainService)
  }

  public async onBadResponse(response: Response): Promise<never> {
    if (response.status === 401) {
      const store = useStore()
      store.session.clear()

      const currentRouteName = router.currentRoute.value.name
      let logInDestination
      if (currentRouteName !== null && typeof currentRouteName === 'string') {
        logInDestination = currentRouteName
      }
      router
        .push({ name: 'login', query: { to: logInDestination, disconnected: 'yes' } })
        .catch((err) => {
          console.error('Échec lors de la redirection vers la page de connexion', err)
          window.location.reload()
        })

      throw new Problem(
        "Le jeton d'authentification semble ne plus être valide.",
        ErrorCode.Unauthenticated
      )
    } else {
      let galliumError
      try {
        galliumError = await response.json()
      } catch {
        galliumError = undefined
      }
      if (
        typeof galliumError === 'object' &&
        galliumError !== null &&
        'debugInfo' in galliumError
      ) {
        console.debug('Informations de débogage disponibles :', galliumError.debugInfo)
      }
      throw Problem.fromGalliumError(galliumError)
    }
  }
}
