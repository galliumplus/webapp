import type { PopUp } from './popup'
import type { InjectionKey } from 'vue'

export type { PopUpOptions, PopUpConfig } from './config'
export { PopUp } from './popup'
export { PopUpService } from './service'

export const ThisPopUp = Symbol('injection key ThisPopUp') as InjectionKey<PopUp>
