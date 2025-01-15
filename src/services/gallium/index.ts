import type { GalliumClientsApi } from './clients'
import type { GalliumRolesApi, GalliumUsersApi } from './users'
import type { LoginCredentials, LoggedIn } from '@/business/access'
import type { SsoClientPublicInfo } from '@/business/clients'

export type { GalliumUsersApi, GalliumRolesApi } from './users'
export type { GalliumClientsApi } from './clients'

export interface GalliumApi {
  logIn(credentials: LoginCredentials): Promise<LoggedIn>

  getSsoPublicInfo(apiKey: string): Promise<SsoClientPublicInfo>
  ssoLogIn(apiKey: string, credentials: LoginCredentials): Promise<string>

  readonly users: GalliumUsersApi
  readonly clients: GalliumClientsApi
  readonly roles: GalliumRolesApi
}
