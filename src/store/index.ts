import { StoragePath } from '@/store/storagePath'
import { RouteStore } from './route'
import { SessionStore } from './session'

export class GalliumStore {
  private _storage: StoragePath

  public constructor(storage: StoragePath) {
    this._storage = storage
  }

  public get route(): RouteStore {
    return new RouteStore(this._storage.child('route'))
  }

  public get session(): SessionStore {
    return new SessionStore(this._storage.child('session'))
  }
}

export { StoragePath } from './storagePath'
