export interface WindowSize {
  width: number
  height: number
}

export interface PopUpConfig {
  isModal: boolean
  title: string
  data: unknown
  windowSize: WindowSize
}

export type PopUpSize = WindowSize | 'medium' | 'small'

export interface PopUpOptions {
  isModal?: boolean
  title: string
  data?: unknown
  size?: PopUpSize
}

export function withDefaultOptions(options: PopUpOptions): PopUpConfig {
  return {
    isModal: options.isModal ?? true,
    title: options.title,
    data: options.data,
    windowSize: resolveWindowSize(options.size)
  }
}

function resolveWindowSize(popUpSize: PopUpSize | undefined): WindowSize {
  if (popUpSize === undefined || typeof popUpSize === 'string') {
    switch (popUpSize) {
      case 'small':
        return { width: 540, height: 340 }

      case 'medium':
      default:
        return { width: 820, height: 580 }
    }
  } else {
    return popUpSize
  }
}
