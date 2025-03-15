import type { PopUpConfig, WindowSize } from './config'
import type { PopUpContext } from './context'
import { PopUpService } from './service'
import type { Component } from 'vue'
import { Reason, PromiseEventEmitter } from '@/helpers'

export class PopUp {
  private readonly _service: PopUpService
  private readonly _component: Component
  private readonly _config: PopUpConfig
  private _openWindow: PopUpContext | null
  private readonly _result: PromiseEventEmitter<any>

  public constructor(service: PopUpService, component: Component, config: PopUpConfig) {
    this._service = service
    this._component = component
    this._config = config
    this._openWindow = null
    this._result = new PromiseEventEmitter()
  }

  public get component(): Component {
    return this._component
  }

  public get title(): string {
    return this._config.title
  }

  public openModal(): PopUp {
    this._openWindow = this._service.openNewModal(this)
    return this
  }

  public dismiss(reason: Reason): void {
    this._openWindow?.close()
    this._openWindow = null
    this._result.reject(reason)
  }

  public minimize(): void {
    if (!this._config.isModal) {
      throw new Error('not implemented')
    }
  }

  public close(value?: any): void {
    this._openWindow?.close()
    this._openWindow = null
    this._result.resolve(value)
  }

  public getResult(): Promise<any> {
    return this._result.asNativePromise()
  }

  public ignoreResult(): void {
    this._result.asNativePromise().catch(() => {})
  }

  public getData<T>(): T {
    return this._config.data as T
  }

  public get windowSize(): WindowSize {
    return this._config.windowSize
  }
}
