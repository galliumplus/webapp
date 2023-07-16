import type { RouteRecordName } from 'vue-router'

class SessionStorage {
  private _storage: Storage

  public constructor() {
    this._storage = window.sessionStorage
  }

  public get loggedIn(): boolean {
    return this._storage.getItem('loggedin') === 'yes'
  }

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
