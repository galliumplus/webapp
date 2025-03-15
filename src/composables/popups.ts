import type { Component } from 'vue'
import { inject } from 'vue'
import { PopUp, type PopUpOptions, ThisPopUp } from '@/services/popups'
import { withDefaultOptions } from '@/services/popups/config'
import {
  MessageBoxBuilder,
  type MessageBoxOptions,
  MessageBoxPopUp
} from '@/services/popups/messageBox.ts'
import { PopUpService } from '@/services/popups/service'

export function usePopUp(component: Component, options: PopUpOptions): PopUp {
  return new PopUp(PopUpService.instance, component, withDefaultOptions(options))
}

export function useThisPopUp(): PopUp {
  const injectedPopUp = inject(ThisPopUp)
  if (injectedPopUp === undefined) {
    throw new Error("La fonction useThisPopUp() a été appelée en dehors d'une fenêtre pop-up !")
  }
  return injectedPopUp
}

export function useMessageBox(): MessageBoxBuilder
export function useMessageBox(options: MessageBoxOptions): MessageBoxPopUp
export function useMessageBox(options?: MessageBoxOptions): MessageBoxPopUp | MessageBoxBuilder {
  const builder = new MessageBoxBuilder(PopUpService.instance)
  if (options === undefined) {
    return builder
  } else {
    return builder.fromOptions(options)
  }
}
