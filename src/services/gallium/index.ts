import type { GalliumUsersApi } from './users'
import type { GalliumClientsApi } from './clients'
import type { LoginCredentials, LoggedIn } from '@/business/access'

export type { GalliumUsersApi } from './users'
export type { GalliumClientsApi } from './clients'

export interface GalliumApi {
  logIn(credentials: LoginCredentials): Promise<LoggedIn>
  ssoLogIn(apiKey: string, credentials: LoginCredentials): Promise<string>

  readonly users: GalliumUsersApi
  readonly clients: GalliumClientsApi
}
