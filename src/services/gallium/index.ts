import { Session } from '@/logic/users'
import { GalliumUserApi } from './users'

export interface GalliumApi {
  login(userId: string, password: string): Promise<Session>

  readonly users: GalliumUserApi
}
