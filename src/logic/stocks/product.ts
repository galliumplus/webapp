import { Availability, type Category } from '.'

export default class Product {
  private readonly _id: number
  private readonly _name: string
  private readonly _stock: number
  private readonly _nonMemberPrice: number
  private readonly _memberPrice: number
  private readonly _availability: Availability
  private readonly _category: Category | null

  public get id(): number {
    return this._id
  }

  public get name(): string {
    return this._name
  }

  get stock(): number {
    return this._stock
  }

  get nonMemberPrice(): number {
    return this._nonMemberPrice
  }

  get memberPrice(): number {
    return this._memberPrice
  }

  get availability(): Availability {
    return this._availability
  }

  get category(): Category | null {
    return this._category
  }

  /**
   * Crée un nouveau produit.
   */
  public constructor()
  /**
   * Crée un produit existant.
   * @param id Son identifiant unique.
   * @param name Son nom.
   * @param stock La quantité restante en stock.
   * @param nonMemberPrice Son prix pour les non adhérents.
   * @param memberPrice Son prix pour les adhérents.
   * @param availability Sa disponibilité.
   * @param category La catégorie à laquelle il appartient.
   */
  public constructor(
    id: number,
    name: string,
    stock: number,
    nonMemberPrice: number,
    memberPrice: number,
    availability: Availability,
    category: Category
  )
  public constructor(
    id?: number,
    name?: string,
    stock?: number,
    nonMemberPrice?: number,
    memberPrice?: number,
    availability?: Availability,
    category?: Category
  ) {
    this._id = id ?? -1
    this._name = name ?? ''
    this._stock = stock ?? 0
    this._nonMemberPrice = nonMemberPrice ?? 0
    this._memberPrice = memberPrice ?? 0
    this._availability = availability ?? Availability.Auto
    this._category = category ?? null
  }
}
