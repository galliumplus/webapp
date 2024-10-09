import type { Component } from 'vue'
import { PopUpService } from './service'
import type { PopUpContext } from './context'
import type { PopUpConfig } from './config'

export class PopUp<C extends Component = Component> {
  private readonly _service: PopUpService
  private readonly _component: C
  private readonly _config: PopUpConfig
  private _openWindow: PopUpContext | null

  public constructor(service: PopUpService, component: C, config: PopUpConfig) {
    this._service = service
    this._component = component
    this._config = config
    this._openWindow = null
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

  public dismiss() {
    this._openWindow?.close()
    this._openWindow = null
  }
}
