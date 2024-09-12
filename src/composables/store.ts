import { SessionStorage } from '@/store'

export function useStore(): SessionStorage {
  return new SessionStorage()
}
