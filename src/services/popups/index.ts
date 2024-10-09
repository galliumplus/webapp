import type { InjectionKey } from 'vue'
import type { PopUp } from './popup'

export type { PopUpOptions, PopUpConfig } from './config'
export { PopUp } from './popup'
export { PopUpService } from './service'

export const ThisPopUp = Symbol('injection key ThisPopUp') as InjectionKey<PopUp>
