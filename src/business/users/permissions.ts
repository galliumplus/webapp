import { NumberFlag } from 'multiflag'

/**
 * Les différentes permissions.
 */
export class GalliumPermission extends NumberFlag {
  /**
   * Accès en lecture seule aux produits et aux catégories.
   */
  public static readonly SeeProductsAndCategories: GalliumPermission = NumberFlag.withValue(0x001)

  /**
   * Accès en lecture/écriture aux produits.
   */
  public static readonly ManageProducts: GalliumPermission = NumberFlag.withValue(
    0x002,
    GalliumPermission.SeeProductsAndCategories
  )

  /**
   * Accès en lecture/écriture aux catégories.
   */
  public static readonly ManageCategories: GalliumPermission = NumberFlag.withValue(
    0x004,
    GalliumPermission.SeeProductsAndCategories
  )

  /**
   * Accès en lecture seule à tous les utilisateurs et aux rôles.
   */
  public static readonly SeeAllUsersAndRoles: GalliumPermission = NumberFlag.withValue(0x008)

  /**
   * Accès à tous les utilisateurs et possibilité de modifier les acomptes.
   */
  public static readonly ManageDeposits: GalliumPermission = NumberFlag.withValue(
    0x010,
    GalliumPermission.SeeAllUsersAndRoles
  )

  /**
   * Accès en lecture/écriture aux utilisateurs.
   */
  public static readonly ManageUsers: GalliumPermission = NumberFlag.withValue(
    0x020,
    GalliumPermission.ManageDeposits
  )

  /**
   * Accès en lecture/écriture aux rôles.
   */
  public static readonly ManageRoles: GalliumPermission = NumberFlag.withValue(
    0x040,
    GalliumPermission.SeeAllUsersAndRoles
  )

  /**
   * Accès à l'historique.
   */
  public static readonly ReadLogs: GalliumPermission = NumberFlag.withValue(0x080)

  /**
   * Gestion complète des applications.
   */
  public static readonly ManageClients: GalliumPermission = NumberFlag.withValue(0x200)

  /**
   * Accès aux outils de développement de Gallium+.
   */
  public static readonly UseDeveloperTools: GalliumPermission = NumberFlag.withValue(0x400)

  /**
   * Les permissions nécessaires pour vendre des produits.
   */
  public static readonly Sell: GalliumPermission = NumberFlag.withoutValue(
    GalliumPermission.ManageProducts,
    GalliumPermission.ManageDeposits
  )
}
