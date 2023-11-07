import { Permissions } from '.'

export default class Role {
  private _id: number
  private _name: string
  private _permissions: Permissions

  public get id(): number {
    return this._id
  }

  public get name(): string {
    return this._name
  }

  public get permissions(): Permissions {
    return this._permissions
  }

  public constructor(id: number, name: string, permissions: Permissions) {
    this._id = id
    this._name = name
    this._permissions = permissions
  }
}
