import { Session } from '../logic'

export interface Api {
  login(userId: string, password: string): Promise<Session>
}