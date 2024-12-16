import type { GalliumClientsApi } from '@/services/gallium'
import { Fake } from '@/services/gallium/fake/index'
import { Problem, ErrorCode } from '@/business/problem'
import type { ClientInit, SameSignOnInit, SsoClientPublicInfo } from '@/business/clients'

export class FakeGalliumClientsService implements GalliumClientsApi {
  public async getSsoPublicInfo(apiKey: string): Promise<SsoClientPublicInfo> {
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

  public async getAll(): Promise<ClientInit[]> {
    return [
      {
        id: 1,
        name: 'Client 1',
        apiKey: 'test-api-key',
        isEnabled: true,
        granted: 0,
        revoked: 0,
        hasAppAccess: false,
        sameSignOn: null
      },
      {
        id: 2,
        name: 'Client 2',
        apiKey: 'test-api-key',
        isEnabled: false,
        granted: 0,
        revoked: 0,
        hasAppAccess: false,
        sameSignOn: null
      }
    ]
  }

  public async save(client: ClientInit): Promise<void> {
    await Fake.delay()
  }
}
