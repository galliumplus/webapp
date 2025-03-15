import { PopUp } from './popup.ts'
import type { PopUpService } from './service.ts'
import { shallowReactive, type ShallowReactive } from 'vue'
import MessageBox from '@/components/popups/MessageBox.vue'
import { Choice, Done, type Progress } from '@/helpers'

const messageBoxWindowSize = { width: 500, height: 250 }

export interface MessageBoxOptions {
  title: string
  message: string
  choices: Choice[]
  progress: Progress
}

export class MessageBoxBuilder {
  private readonly _service: PopUpService

  public constructor(service: PopUpService) {
    this._service = service
  }

  public fromOptions(options: MessageBoxOptions): MessageBoxPopUp {
    return new MessageBoxPopUp(this._service, options)
  }

  public askBeforeProceeding(options: { title: string; message: string }): MessageBoxPopUp {
    const popUp = new MessageBoxPopUp(this._service, {
      title: options.title,
      message: options.message,
      choices: [Choice.Cancel, Choice.Proceed],
      progress: Done
    })
    popUp.openModal()
    return popUp
  }
}

export class MessageBoxPopUp extends PopUp {
  private _options: ShallowReactive<MessageBoxOptions>

  public constructor(service: PopUpService, options: MessageBoxOptions) {
    const reactiveOptions = shallowReactive(options)
    super(service, MessageBox, {
      title: options.title,
      isModal: true,
      data: reactiveOptions,
      windowSize: messageBoxWindowSize
    })
    this._options = reactiveOptions
  }
}
