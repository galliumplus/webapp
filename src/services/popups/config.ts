export interface PopUpConfig {
  isModal: boolean
  title: string
  data: unknown
}

export interface PopUpOptions {
  isModal?: boolean
  title: string
  data?: unknown
}

export function withDefaultOptions(options: PopUpOptions): PopUpConfig {
  return {
    isModal: options?.isModal ?? true,
    title: options?.title,
    data: options?.data
  }
}
