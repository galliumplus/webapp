import type { ClientInit, SsoClientPublicInfo } from '@/business/clients'

export interface GalliumClientsApi {
  getAll(): Promise<ClientInit[]>
  save(id: number): Promise<void>
}
