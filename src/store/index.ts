import { GalliumPermissions } from '@/business/users'
import type { RouteRecordName } from 'vue-router'
import type { LoggedIn } from '@/business/access'

export class SessionStorage {
  private _storage: Storage

  public constructor() {
    this._storage = window.sessionStorage
  }

  // Sessions ==================================================================

  public get loggedIn(): boolean {
    return Boolean(this._storage.getItem('session-token'))
  }

  public get sessionToken(): string {
    return this._storage.getItem('session-token') ?? ''
  }

  public get sessionPermissions(): GalliumPermissions {
    return GalliumPermissions.parse(this._storage.getItem('session-permissions'))
  }

  public get userShortDisplayName(): string {
    return this._storage.getItem('session-user-short-display-name') ?? '(inconnu)'
  }

  public set session(session: LoggedIn) {
    this._storage.setItem('session-token', session.token)
    this._storage.setItem('session-permissions', session.permissions.toString())
    this._storage.setItem('session-user-short-display-name', session.user.shortDisplayName)
  }

  public clearSession() {
    this._storage.removeItem('session-token')
    this._storage.removeItem('session-permissions')
    this._storage.removeItem('session-user-short-display-name')
  }

  // Routing ===================================================================

  public get previousRouteName(): RouteRecordName {
    return this._storage.getItem('previous-name') ?? 'unknown'
  }

  public set previousRouteName(name: RouteRecordName) {
    this._storage.setItem('previous-name', name.toString())
  }

  public get previousRouteUrl(): string {
    return this._storage.getItem('previous-url') ?? '/'
  }

  public set previousRouteUrl(url: string) {
    this._storage.setItem('previous-url', url)
  }
}
