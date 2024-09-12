export class LoginCredentials {
  private _username: string
  private _password: string

  public constructor() {
    this._username = ''
    this._password = ''
  }

  public get username(): string {
    return this._username
  }

  public set username(value: string) {
    this._username = value
  }

  public get password(): string {
    return this._password
  }

  public set password(value: string) {
    this._password = value
  }

  public reset() {
    this._username = ''
    this._password = ''
  }
}
