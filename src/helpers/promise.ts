export class PromiseEventEmitter<T> {
  private readonly _promise: Promise<T>
  private _resolve!: (value: T) => void
  private _reject!: (reason?: unknown) => void

  public constructor() {
    this._promise = new Promise((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
    })
  }

  private checkIfSetUp() {
    if (this._resolve === undefined || this._reject === undefined) {
      throw new Error('Promise touched before the executor was called')
    }
  }

  public asNativePromise(): Promise<T> {
    this.checkIfSetUp()
    return this._promise
  }

  public resolve(value: T): void {
    this.checkIfSetUp()
    this._resolve(value)
  }

  public reject(reason?: unknown): void {
    this.checkIfSetUp()
    this._reject(reason)
  }
}
