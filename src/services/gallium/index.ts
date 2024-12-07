import type { GalliumUsersApi } from './users'
import type { GalliumClientsApi } from './clients'
import type { LoginCredentials, LoggedIn } from '@/business/access'
import type { SsoClientPublicInfo } from '@/business/clients'

export type { GalliumUsersApi } from './users'
export type { GalliumClientsApi } from './clients'

export interface GalliumApi {
  logIn(credentials: LoginCredentials): Promise<LoggedIn>

  getSsoPublicInfo(apiKey: string): Promise<SsoClientPublicInfo>
  ssoLogIn(apiKey: string, credentials: LoginCredentials): Promise<string>

  readonly users: GalliumUsersApi
  readonly clients: GalliumClientsApi
}
