import type { GalliumClientsApi } from '@/services/gallium/clients'
import type { LoginClient, SsoClientPublicInfo } from '@/business/clients'

export class GalliumClientsService implements GalliumClientsApi {
  public getPublicInfoSso(apiKey: string): Promise<SsoClientPublicInfo> {
    throw 'Not implemented'
  }
}
