import type { App, Plugin } from 'vue'
import { GalliumPermission } from '@/business/users'
import { useStore } from '@/composables'

declare module 'vue' {
  interface ComponentCustomProperties {
    G: typeof globalConstants
    $hasPermission: typeof hasPermission
    $hasAllPermissions: typeof hasAllPermissions
    $hasAnyPermission: typeof hasAnyPermission
  }
}

const globalConstants = {
  Permission: GalliumPermission
}

function hasPermission(...perms: GalliumPermission[]) {
  const sessionPerms = useStore().session.permissions
  return perms.every((p) => p.in(sessionPerms))
}

function hasAllPermissions(...perms: GalliumPermission[]) {
  const sessionPerms = useStore().session.permissions
  return perms.every((p) => p.in(sessionPerms))
}

function hasAnyPermission(...perms: GalliumPermission[]) {
  const sessionPerms = useStore().session.permissions
  return perms.some((p) => p.in(sessionPerms))
}

export const globalServices: Plugin = {
  install(app: App) {
    app.config.globalProperties.G = globalConstants
    app.config.globalProperties.$hasPermission = hasPermission
    app.config.globalProperties.$hasAllPermissions = hasAllPermissions
    app.config.globalProperties.$hasAnyPermission = hasAnyPermission
  }
}
