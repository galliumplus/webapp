import type { ClientInit, SsoClientPublicInfo } from '@/business/clients'

export interface GalliumClientsApi {
  getAll(): Promise<ClientInit[]>
  save(client: ClientInit): Promise<void>
}
