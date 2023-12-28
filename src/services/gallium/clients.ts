import type { LoginClient } from '@/logic/clients'

export interface GalliumClientApi {
  getSsoLoginClient(apiKey: string): Promise<LoginClient>
}
