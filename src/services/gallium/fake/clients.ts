import { Fake } from './data'
import { Client } from '@/business/apps'
import type { GeneratedSecret } from '@/business/apps/secrets'
import type { GalliumClientsApi } from '@/services/gallium'

export class FakeGalliumClientsService implements GalliumClientsApi {
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

  public create(): Client {
    return Fake.client()
  }

  public getAll(): Promise<Client[]> {
    return Promise.resolve([])
  }

  public save(client: Client): Promise<void> {
    return Promise.resolve(undefined)
  }
}
