import type { GalliumClientsApi } from '@/services/gallium'
import { Fake } from '@/services/gallium/fake/index'
import { Problem, ErrorCode } from '@/business/problem'
import type { SsoClientPublicInfo } from '@/business/clients'

export class FakeGalliumClientsService implements GalliumClientsApi {
  public async getPublicInfoSso(apiKey: string): Promise<SsoClientPublicInfo> {
    await Fake.delay()
    if (apiKey == 'demo') {
      return Fake.ssoClientPublicInfo()
    } else {
      throw new Problem(
        `Application SSO inconnue. La clé d'API ${apiKey} n'est pas valide.`,
        ErrorCode.ItemNotFound
      )
    }
  }
}
