import { FakeCollection } from './generic'
import { Client } from '@/business/apps'
import type { GeneratedSecret } from '@/business/apps/secrets.ts'
import type { GalliumClientsApi } from '@/services/gallium'
import { Fake } from '@/services/gallium/fake/index.ts'
import { client } from '@/services/gallium/webservice/clients.ts'

export class FakeGalliumClientsService
  extends FakeCollection<Client, 'id'>
  implements GalliumClientsApi
{
  public constructor() {
    super(client, 'id', [
      new Client({
        id: 1,
        name: 'Client 1',
        apiKey: 'test-api-key',
        isEnabled: true,
        allowed: 2047,
        granted: 0,
        hasAppAccess: false,
        sameSignOn: null
      }),
      new Client({
        id: 2,
        name: 'Client 2',
        apiKey: 'test-api-key-alt',
        isEnabled: true,
        allowed: 2047,
        granted: 0,
        hasAppAccess: false,
        sameSignOn: null
      })
    ])
  }

  public async generateNewAppAccessSecret(id: number): Promise<GeneratedSecret> {
    await Fake.delay()
    return { secret: 'AAAAAAAA-AAAAAAAAAAAA-AAAAAAAA' }
  }

  public async generateNewSameSignOnSecret(
    id: number,
    signatureType: string
  ): Promise<GeneratedSecret> {
    await Fake.delay()
    return { secret: 'AAAAAAAA-AAAAAAAAAAAA-AAAAAAAA', signatureType }
  }
}
