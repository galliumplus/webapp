export interface PopUpConfig {
  isModal: boolean
  title: string
}

export interface PopUpOptions {
  isModal?: boolean
  title: string
}

export function withDefaultOptions(options: PopUpOptions): PopUpConfig {
  return {
    isModal: options?.isModal ?? true,
    title: options?.title
  }
}
