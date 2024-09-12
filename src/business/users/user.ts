export interface UserInit {
  id: string
  firstName: string
  lastName: string
  email: string
  role: number
  year: string
  deposit: number | null
  isMember: boolean
}

export class User {
  private readonly _id: string
  private readonly _firstName: string
  private readonly _lastName: string
  private readonly _email: string
  private readonly _role: number
  private readonly _year: string
  private readonly _deposit: number | null
  private readonly _isMember: boolean

  public constructor(init: UserInit) {
    this._id = init.id
    this._firstName = init.firstName
    this._lastName = init.lastName
    this._email = init.email
    this._role = init.role
    this._year = init.year
    this._deposit = init.deposit
    this._isMember = init.isMember
  }

  public get id(): string {
    return this._id
  }

  public get firstName(): string {
    return this._firstName
  }

  public get lastName(): string {
    return this._lastName
  }

  public get email(): string {
    return this._email
  }

  public get role(): number {
    return this._role
  }

  public get year(): string {
    return this._year
  }

  public get deposit(): number | null {
    return this._deposit
  }

  public get isMember(): boolean {
    return this._isMember
  }

  public get hasName(): boolean {
    return this._lastName.trim().length > 0 || this._firstName.trim().length > 0
  }

  public get shortDisplayName(): string {
    const firstName = this._firstName.replace(/(?=[^a-zâàæêèéëîïôòœûùüç])./gi, (m) =>
      m.toUpperCase()
    )
    const lastNameInitial = this._lastName.trim().charAt(0).toUpperCase()
    return `${firstName} ${lastNameInitial}.`
  }

  public get longDisplayName(): string {
    const firstName = this._firstName.replace(/(?=[^a-zâàæêèéëîïôòœûùüç])./gi, (m) =>
      m.toUpperCase()
    )
    const lastName = this._lastName.toUpperCase()
    return `${firstName} ${lastName}`
  }
}
