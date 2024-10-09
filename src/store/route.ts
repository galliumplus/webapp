import type { RouteRecordName } from 'vue-router'
import type { StoragePath } from '@/store/storagePath'

export class RouteStore {
  private _storage: StoragePath

  public constructor(storage: StoragePath) {
    this._storage = storage
  }

  public get previousName(): RouteRecordName {
    return this._storage.get('previousName') ?? 'unknown'
  }

  public set previousName(name: RouteRecordName) {
    this._storage.set('previousName', name.toString())
  }

  public get previousPath(): string {
    return this._storage.get('previousPath') ?? '/'
  }

  public set previousPath(path: string) {
    this._storage.set('previousPath', path)
  }
}
