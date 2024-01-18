export default class Category {
  private readonly _id: number
  private readonly _name: string

  public get id(): number {
    return this._id
  }

  public get name(): string {
    return this._name
  }

  constructor() {}
}
