export default class Permissions {
  public static readonly SEE_PRODUCTS_AND_CATEGORIES: Permissions = new Permissions(0x001)
  public static readonly MANAGE_PRODUCTS: Permissions = new Permissions(0x003)
  public static readonly MANAGE_CATEGORIES: Permissions = new Permissions(0x005)
  public static readonly SEE_ALL_USERS_AND_ROLES: Permissions = new Permissions(0x008)
  public static readonly MANAGE_DEPOSITS: Permissions = new Permissions(0x018)
  public static readonly MANAGE_USERS: Permissions = new Permissions(0x038)
  public static readonly MANAGE_ROLES: Permissions = new Permissions(0x048)
  public static readonly READ_LOGS: Permissions = new Permissions(0x080)
  public static readonly RESET_MEMBERSHIPS: Permissions = new Permissions(0x138)
  public static readonly SELL: Permissions = new Permissions(0x01b)
  public static readonly NONE: Permissions = new Permissions(0x000)

  private _code: number

  public constructor(code: number) {
    this._code = code
  }

  public includes(other: Permissions): boolean {
    return (this._code & other._code) == other._code
  }
}
