import type { SsoClientPublicInfo } from '@/business/clients'
import type { ClientSummary } from '@/business/clients/client'

export interface GalliumClientsApi {
  getAll(): Promise<ClientSummary[]>
  getPublicInfoSso(apiKey: string): Promise<SsoClientPublicInfo>
}
