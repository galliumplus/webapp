import type { Component } from 'vue'
import { PopUp, type PopUpOptions } from '@/services/popups'
import { PopUpService } from '@/services/popups/service'
import { withDefaultOptions } from '@/services/popups/config'

export function usePopUp<C extends Component>(component: C, options: PopUpOptions): PopUp<C> {
  return PopUpService.instance.makePopUp(component, withDefaultOptions(options))
}
