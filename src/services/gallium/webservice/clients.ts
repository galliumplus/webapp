import type { GalliumClientApi } from '@/services/gallium/clients'
import type { LoginClient } from '@/logic/clients'
import RestService from '@/services/rest'

export default class GalliumClientsService extends RestService implements GalliumClientApi {
  getSsoLoginClient(apiKey: string): Promise<LoginClient> {
    throw 'Not implemented'
  }
}
