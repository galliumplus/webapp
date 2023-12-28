import type { Session } from '@/logic/users'
import type { GalliumUserApi } from './users'
import type { GalliumClientApi } from './clients'
import type LoginCredentials from '@/logic/users/login-credentials'

export type { GalliumUserApi } from './users'
export type { GalliumClientApi } from './clients'

export interface GalliumApi {
  logIn(credentials: LoginCredentials): Promise<Session>
  ssoLogIn(apiKey: string, credentials: LoginCredentials): Promise<string>

  readonly users: GalliumUserApi
  readonly clients: GalliumClientApi
}
