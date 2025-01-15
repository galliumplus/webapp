import type { CollectionResource } from '@hokaze/core'
import { Fake } from '@/services/gallium/fake/index'

export abstract class FakeCollection<T, K extends keyof T> implements CollectionResource<T> {
  private readonly _keyProperty: K
  private _autoIncrement: number
  private _data: Map<number, T>

  protected constructor(keyProperty: K, initialData: T[]) {
    this._keyProperty = keyProperty
    this._autoIncrement = 1
    this._data = new Map()
    for (const value of initialData) {
      this._data.set(value[this._keyProperty] as number, value)
    }
  }

  private storeNewValue(value: T): void {
    while (this._data.has(this._autoIncrement)) this._autoIncrement++
    ;(value[this._keyProperty] as number) = this._autoIncrement
    this._data.set(this._autoIncrement, value)
  }

  public get asPath(): never {
    throw new Error('not implemented')
  }

  public get keyProperty(): keyof T {
    return this._keyProperty
  }

  public abstract create(): T

  public async delete(item: T): Promise<void> {
    await this.deleteKey(castKey(item[this._keyProperty]))
  }

  public async deleteAll(): Promise<void> {
    await Fake.delay()
    this._data.clear()
  }

  public async deleteKey(key: number): Promise<void> {
    await Fake.delay()
    this._data.delete(key)
  }

  public async get(key: number): Promise<T> {
    await Fake.delay()
    return this._data.get(key)!
  }

  public async getAll(): Promise<T[]> {
    await Fake.delay()
    return Array.from(this._data.values())
  }

  public isNew(item: T): boolean {
    return !this._data.has(item[this._keyProperty] as number)
  }

  public async save(item: T): Promise<void> {
    await Fake.delay()
    if (this.isNew(item)) {
      this.storeNewValue(item)
    } else {
      this._data.set(item[this._keyProperty] as number, item)
    }
  }

  public async send(item: T): Promise<void> {
    this.storeNewValue(item)
  }
}

function castKey(key: unknown): number {
  if (typeof key === 'number') {
    return key
  } else {
    return Number(key)
  }
}
