export class StoragePath {
  private readonly _storage: Storage
  private readonly _path: string

  private constructor(storage: Storage, path: string) {
    this._storage = storage
    this._path = path
  }

  public static root(storage: Storage, name: string): StoragePath {
    return new StoragePath(storage, name)
  }

  private childPath(name: string): string {
    return this._path + '.' + name
  }

  public child(name: string): StoragePath {
    return new StoragePath(this._storage, this.childPath(name))
  }

  public get(key: string): string | null {
    return this._storage.getItem(this.childPath(key))
  }

  public set(key: string, value: string): void {
    this._storage.setItem(this.childPath(key), value)
  }

  public unset(key: string): void {
    this._storage.removeItem(this.childPath(key))
  }
}
