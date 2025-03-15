import type { PopUpConfig } from './config'
import { ModalContext, type PopUpContext } from './context'
import { PopUp } from './popup'
import type { Component, ShallowReactive } from 'vue'
import { shallowReactive } from 'vue'

export class PopUpService {
  private static _instance?: PopUpService

  public static get instance(): PopUpService {
    return (this._instance ??= new PopUpService())
  }

  private readonly _openModals: ShallowReactive<PopUp[]>

  private constructor() {
    this._openModals = shallowReactive([])
  }

  public get openModals(): ShallowReactive<PopUp[]> {
    return this._openModals
  }

  public openNewModal(popUp: PopUp): PopUpContext {
    const currentLayer = this._openModals.length
    this._openModals.push(popUp)
    return new ModalContext(this, currentLayer)
  }

  public closeModals(toLayer: number) {
    while (this._openModals.length > toLayer) {
      this._openModals.pop()
    }
  }
}
