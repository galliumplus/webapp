import { Session, User } from '../logic'

export interface Api {
  login(userId: string, password: string): Promise<Session>

  readonly users: UserApi
}

export interface UserApi {
  self(): Promise<User>
}