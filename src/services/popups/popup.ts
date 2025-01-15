import type { PopUpConfig } from './config'
import type { PopUpContext } from './context'
import { PopUpService } from './service'
import type { Component } from 'vue'
import { PromiseEventEmitter } from '@/helpers'

export class PopUp<C extends Component = Component> {
  private readonly _service: PopUpService
  private readonly _component: C
  private readonly _config: PopUpConfig
  private _openWindow: PopUpContext | null
  private readonly _result: PromiseEventEmitter<any>

  public constructor(service: PopUpService, component: C, config: PopUpConfig) {
    this._service = service
    this._component = component
    this._config = config
    this._openWindow = null
    this._result = new PromiseEventEmitter()
  }

  public get component(): C {
    return this._component
  }

  public get title(): string {
    return this._config.title
  }

  public openModal() {
    this._openWindow = this._service.openNewModal(this)
  }

  public dismiss(reason?: unknown) {
    this._openWindow?.close()
    this._openWindow = null
    this._result.reject(reason)
  }

  public close(value?: any) {
    this._openWindow?.close()
    this._openWindow = null
    this._result.resolve(value)
  }

  public get result(): Promise<any> {
    return this._result.asNativePromise()
  }

  public getData<T>(): T {
    return this._config.data as T
  }
}
