import type { CollectionResource } from '@hokaze/core'
import { Client } from '@/business/apps'
import type { GeneratedSecret } from '@/business/apps/secrets.ts'

export interface GalliumClientsApi extends CollectionResource<Client> {
  generateNewAppAccessSecret(id: number): Promise<GeneratedSecret>
  generateNewSameSignOnSecret(id: number, signatureType: string): Promise<GeneratedSecret>
}
