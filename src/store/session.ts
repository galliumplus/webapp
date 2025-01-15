import type { StoragePath } from './storagePath'
import type { LoggedIn } from '@/business/access'

export class SessionStore {
  private _storage: StoragePath

  public constructor(storage: StoragePath) {
    this._storage = storage
  }

  public get isLoggedIn(): boolean {
    return Boolean(this._storage.get('token'))
  }

  public get token(): string {
    return this._storage.get('token') ?? ''
  }

  public get permissions(): number {
    return parseInt(this._storage.get('permissions') ?? '0')
  }

  public get userShortDisplayName(): string {
    return this._storage.get('userShortDisplayName') ?? '(inconnu)'
  }

  public set(session: LoggedIn) {
    this._storage.set('token', session.token)
    this._storage.set('permissions', session.permissions.toString())
    this._storage.set('userShortDisplayName', session.user.shortDisplayName)
  }

  public clear(): void {
    this._storage.unset('token')
    this._storage.unset('permissions')
    this._storage.unset('userShortDisplayName')
  }
}
