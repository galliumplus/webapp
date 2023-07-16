import CONFIG from '../config'
import { Session } from "../logic"
import FakeApi from "./fakeapi"

export interface Api {
  login(userId: string, password: string): Promise<Session>
}

export const defaultApiService: Api = new FakeApi()