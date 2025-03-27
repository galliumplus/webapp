import { Client } from '@/business/apps'
import type { GeneratedSecret } from '@/business/apps/secrets.ts'

export interface GalliumClientsApi {
  getAll(): Promise<Client[]>
  create(): Client
  save(client: Client): Promise<void>
  generateNewAppAccessSecret(id: number): Promise<GeneratedSecret>
  generateNewSameSignOnSecret(id: number, signatureType: string): Promise<GeneratedSecret>
}
