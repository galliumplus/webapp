import type { Component } from 'vue'
import { inject } from 'vue'
import { PopUp, type PopUpOptions, ThisPopUp } from '@/services/popups'
import { withDefaultOptions } from '@/services/popups/config'
import { PopUpService } from '@/services/popups/service'

export function usePopUp<C extends Component>(component: C, options: PopUpOptions): PopUp<C> {
  return PopUpService.instance.makePopUp(component, withDefaultOptions(options))
}

export function useThisPopUp(): PopUp {
  const injectedPopUp = inject(ThisPopUp)
  if (injectedPopUp === undefined) {
    throw new Error("La fonction useThisPopUp() a été appelée en dehors d'une fenêtre pop-up !")
  }
  return injectedPopUp
}
