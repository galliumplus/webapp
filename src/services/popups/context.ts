import type { PopUpService } from '@/services/popups/service'

export interface PopUpContext {
  close(): void
}

export class ModalContext implements PopUpContext {
  private readonly _service: PopUpService
  private readonly _layer: number

  constructor(service: PopUpService, layer: number) {
    this._service = service
    this._layer = layer
  }

  public close(): void {
    this._service.closeModals(this._layer)
  }
}
