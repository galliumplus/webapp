import { NumberFlag } from 'multiflag'

/**
 * Les différentes permissions.
 */
export class GalliumPermission extends NumberFlag {
  /**
   * Accès en lecture seule aux produits et aux catégories.
   */
  public static readonly SEE_PRODUCTS_AND_CATEGORIES: GalliumPermission =
    NumberFlag.withValue(0x001)

  /**
   * Accès en lecture/écriture aux produits.
   */
  public static readonly MANAGE_PRODUCTS: GalliumPermission = NumberFlag.withValue(
    0x002,
    GalliumPermission.SEE_PRODUCTS_AND_CATEGORIES
  )

  /**
   * Accès en lecture/écriture aux catégories.
   */
  public static readonly MANAGE_CATEGORIES: GalliumPermission = NumberFlag.withValue(
    0x004,
    GalliumPermission.SEE_PRODUCTS_AND_CATEGORIES
  )

  /**
   * Accès en lecture seule à tous les utilisateur et aux rôles.
   */
  public static readonly SEE_ALL_USERS_AND_ROLES: GalliumPermission = NumberFlag.withValue(0x008)

  /**
   * Accès à tous les utilisateurs et possibilité de modifier les acomptes.
   */
  public static readonly MANAGE_DEPOSITS: GalliumPermission = NumberFlag.withValue(
    0x010,
    GalliumPermission.SEE_ALL_USERS_AND_ROLES
  )

  /**
   * Accès en lecture/écriture aux utilisateurs.
   */
  public static readonly MANAGE_USERS: GalliumPermission = NumberFlag.withValue(
    0x020,
    GalliumPermission.MANAGE_DEPOSITS
  )

  /**
   * Accès en lecture/écriture aux rôles.
   */
  public static readonly MANAGE_ROLES: GalliumPermission = NumberFlag.withValue(
    0x040,
    GalliumPermission.SEE_ALL_USERS_AND_ROLES
  )

  /**
   * Accès à l'historique.
   */
  public static readonly READ_LOGS: GalliumPermission = NumberFlag.withValue(0x080)

  /**
   * Possibilité de révoquer toutes les adhésions.
   */
  public static readonly RESET_MEMBERSHIPS: GalliumPermission = NumberFlag.withValue(
    0x100,
    GalliumPermission.MANAGE_USERS
  )

  /**
   * Les permissions nécessaires pour vendre des produits.
   */
  public static readonly SELL: GalliumPermission = NumberFlag.withoutValue(
    GalliumPermission.MANAGE_PRODUCTS,
    GalliumPermission.MANAGE_DEPOSITS
  )
}

/**
 * Un groupe de permissions.
 */
export class GalliumPermissions {
  private _code: number

  /**
   * Crée un groupe de permissions.
   * @param code (optionnel) Le code de permissions si le groupe est crée à partir d'informations existantes.
   */
  public constructor(code?: number) {
    this._code = code ?? 0
  }

  /**
   * Teste si une permissions est présente dans le groupe.
   * @param permission
   */
  public includes(permission: GalliumPermission): boolean {
    return permission.in(this._code)
  }

  /**
   * Donne une permission.
   * @param permission La nouvelle permission.
   */
  public grant(permission: GalliumPermission) {
    this._code = permission.addTo(this._code)
  }

  /**
   * Retire un permission.
   * @param permission
   */
  public revoke(permission: GalliumPermission) {
    this._code = permission.removeFrom(this._code)
  }

  public toString(): string {
    return this._code.toString()
  }

  /**
   * Crée des permissions depuis une forme de texte.
   *
   * @param value La valeur à convertir.
   *
   * @returns Une instance de la classe {@link GalliumPermissions}.
   */
  public static parse(value: string | null | undefined): GalliumPermissions {
    return new GalliumPermissions(parseInt(value ?? '0'))
  }
}
