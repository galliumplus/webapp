import { GalliumStore, StoragePath } from '@/store'

export function useStore(): GalliumStore {
  return new GalliumStore(StoragePath.root(window.sessionStorage, 'gallium'))
}
