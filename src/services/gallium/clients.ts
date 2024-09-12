import type { SsoClientPublicInfo } from '@/business/clients'

export interface GalliumClientsApi {
  getPublicInfoSso(apiKey: string): Promise<SsoClientPublicInfo>
}
