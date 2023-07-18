import { Dayjs } from 'dayjs'
import { User, Permissions } from '.'

export default class Session {
  private _token: string
  private _expiration: Dayjs
  private _user: User
  private _permissions: Permissions

  public get token(): string {
    return this._token
  }

  public get expiration(): Dayjs {
    return this._expiration
  }

  public get user(): User {
    return this._user
  }

  public get permissions(): Permissions {
    return this._permissions
  }

  public constructor(token: string, expiration: Dayjs, user: User, permissions: Permissions) {
    this._token = token
    this._expiration = expiration
    this._user = user
    this._permissions = permissions
  }
}
