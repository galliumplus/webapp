import { Role } from '.'

export default class User {
  private _id: string
  private _name: string
  private _role: Role
  private _year: string
  private _isMember: boolean

  public get id(): string {
    return this._id
  }

  public get name(): string {
    return this._name
  }

  public get role(): Role {
    return this._role
  }

  public get year(): string {
    return this._year
  }

  public get isMember(): boolean {
    return this._isMember
  }

  public constructor(id: string, name: string, role: Role, year: string, isMember: boolean) {
    this._id = id
    this._name = name
    this._role = role
    this._year = year
    this._isMember = isMember
  }
}
