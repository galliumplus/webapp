import type { GalliumClientApi } from '@/services/gallium/clients'
import type { LoginClient } from '@/logic/clients'
import { Fake } from '@/services/gallium/fake/index'
import { ErrorCode, Problem } from '@/logic'

export default class FakeGalliumClientsService implements GalliumClientApi {
  public async getSsoLoginClient(apiKey: string): Promise<LoginClient> {
    await Fake.delay()
    if (apiKey == 'demo') {
      return Fake.ssoLoginClient()
    } else {
      throw new Problem(
        `Application SSO inconnue. La clé d'API ${apiKey} n'est pas valide.`,
        ErrorCode.ItemNotFound
      )
    }
  }
}
