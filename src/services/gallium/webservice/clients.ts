import type { GalliumClientsApi } from '@/services/gallium/clients'
import type { ClientInit, SsoClientPublicInfo } from '@/business/clients'
import { type CollectionResource, type ObjectDescriptor, type Service } from '@hokaze/core'
import { boolean, number, object, string } from '@hokaze/core'

export const client: ObjectDescriptor<ClientInit> = object({
  id: number,
  apiKey: string.readOnly,
  name: string,
  granted: number,
  revoked: number,
  isEnabled: boolean,
  hasAppAccess: boolean,
  sameSignOn: object({
    signatureType: string,
    scope: number,
    displayName: string.nullable,
    redirectUrl: string,
    logoUrl: string.nullable,
    requiresApiKey: boolean
  }).nullable
})

export class GalliumClientsService implements GalliumClientsApi {
  private _clientsResource: CollectionResource<ClientInit>

  public constructor(service: Service) {
    this._clientsResource = service.collection('clients', client)
  }

  public getAll(): Promise<ClientInit[]> {
    return this._clientsResource.getAll()
  }

  public save(client: ClientInit): Promise<void> {
    return this._clientsResource.save(client)
  }
}
