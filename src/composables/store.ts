import { SessionStorage } from '@/store'

function useStore(): SessionStorage {
  return new SessionStorage()
}

export default useStore
