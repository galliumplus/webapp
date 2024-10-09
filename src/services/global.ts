import type { App, Plugin } from 'vue'
import { GalliumPermission } from '@/business/users'
import { useStore } from '@/composables'

declare module 'vue' {
  interface ComponentCustomProperties {
    G: typeof globalConstants
    $hasPermission: typeof hasPermission
    $hasAllPermissions: typeof hasAllPermissions
    $hasAnyPermission: typeof hasAnyPermission
    $test: typeof test
  }
}

const globalConstants = {
  SeeProductsAndCategories: GalliumPermission.SEE_PRODUCTS_AND_CATEGORIES,
  ManageProducts: GalliumPermission.MANAGE_PRODUCTS,
  ManageCategories: GalliumPermission.MANAGE_CATEGORIES,
  SeeAllUsersAndRoles: GalliumPermission.SEE_ALL_USERS_AND_ROLES,
  ManageDeposits: GalliumPermission.MANAGE_DEPOSITS,
  ManageUsers: GalliumPermission.MANAGE_USERS,
  ManageRoles: GalliumPermission.MANAGE_ROLES,
  ReadLogs: GalliumPermission.READ_LOGS,
  ResetMemberships: GalliumPermission.RESET_MEMBERSHIPS,
  Sell: GalliumPermission.SELL
}

function hasPermission(...perms: GalliumPermission[]) {
  const sessionPerms = useStore().session.permissions
  return perms.every((p) => sessionPerms.includes(p))
}

function hasAllPermissions(...perms: GalliumPermission[]) {
  const sessionPerms = useStore().session.permissions
  return perms.every((p) => sessionPerms.includes(p))
}

function hasAnyPermission(...perms: GalliumPermission[]) {
  const sessionPerms = useStore().session.permissions
  return perms.some((p) => sessionPerms.includes(p))
}

function test(this: unknown) {
  console.log(this)
}

export const globalServices: Plugin = {
  install(app: App) {
    app.config.globalProperties.G = globalConstants
    app.config.globalProperties.$hasPermission = hasPermission
    app.config.globalProperties.$hasAllPermissions = hasAllPermissions
    app.config.globalProperties.$hasAnyPermission = hasAnyPermission
    app.config.globalProperties.$test = test
  }
}
