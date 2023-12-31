import { Permissions, Session } from '@/logic/users'
import type { RouteRecordName } from 'vue-router'

class SessionStorage {
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

  public get sessionPermissions(): Permissions {
    return Permissions.parse(this._storage.getItem('session-permissions'))
  }

  public set session(session: Session) {
    this._storage.setItem('session-token', session.token)
    this._storage.setItem('session-permissions', session.permissions.toString())
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

const store = new SessionStorage()

export default store
