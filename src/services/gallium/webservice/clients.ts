import type { CollectionResource, Service } from '@hokaze/core'
import { boolean, number, object, string } from '@hokaze/core'
import { Client } from '@/business/apps'
import type { GeneratedSecret } from '@/business/apps/secrets.ts'
import type { GalliumClientsApi } from '@/services/gallium'

export class GalliumClientsService implements GalliumClientsApi {
  private _service: Service
  private _resource: CollectionResource<Client>

  constructor(service: Service) {
    this._service = service

    this._resource = service.collection(
      'clients',
      object({
        id: number,
        apiKey: string.readOnly,
        name: string,
        allowed: number,
        granted: number,
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
      }).asInstanceOf(Client)
    )
  }

  public generateNewAppAccessSecret(id: number): Promise<GeneratedSecret> {
    return this._service
      .postRequest({
        path: `clients/${id}/app-access-secret`,
        response: object({ secret: string })
      })
      .send()
  }

  public generateNewSameSignOnSecret(id: number, signatureType: string): Promise<GeneratedSecret> {
    return this._service
      .postRequest({
        path: `clients/${id}/sso-secret`,
        request: object({ signatureType: string }),
        response: object({ secret: string, signatureType: string })
      })
      .send({ signatureType })
  }

  public create(): Client {
    return this._resource.create()
  }

  public getAll(): Promise<Client[]> {
    return this._resource.getAll()
  }

  public save(client: Client): Promise<void> {
    return this._resource.save(client)
  }
}
