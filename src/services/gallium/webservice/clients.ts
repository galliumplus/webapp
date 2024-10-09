import type { GalliumClientsApi } from '@/services/gallium/clients'
import type { ClientInit, SsoClientPublicInfo } from '@/business/clients'
import type { CollectionResource, ObjectDescriptor, Service } from '@hokaze/core'
import { boolean, number, object, string } from '@hokaze/core'
import type { ClientSummary } from '@/business/clients/client'

export const client: ObjectDescriptor<ClientInit> = object({
  id: number,
  apiKey: string.readOnly.optional,
  name: string,
  granted: number.optional,
  revoked: number.optional,
  isEnabled: boolean
})

export class GalliumClientsService implements GalliumClientsApi {
  private _clientsResource: CollectionResource<ClientInit>

  public constructor(service: Service) {
    this._clientsResource = service.collection('clients', client)
  }

  async getAll(): Promise<ClientSummary[]> {
    return await this._clientsResource.getAll()
  }

  public getPublicInfoSso(apiKey: string): Promise<SsoClientPublicInfo> {
    throw 'Not implemented'
  }
}
