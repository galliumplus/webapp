import { Dayjs } from 'dayjs'
import { User } from '.'

export default class Session {
  private _token: string
  private _expiration: Dayjs
  private _user: User

  public get token(): string {
    return this._token
  }

  public get expiration(): Dayjs {
    return this._expiration
  }

  public get user(): User {
    return this._user
  }

  public constructor(token: string, expiration: Dayjs, user: User) {
    this._token = token
    this._expiration = expiration
    this._user = user
  }
}
