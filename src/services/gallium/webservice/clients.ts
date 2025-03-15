import type { CollectionResource, ObjectDescriptor, Service } from '@hokaze/core'
import { boolean, number, object, service, string } from '@hokaze/core'
import { Client } from '@/business/apps'
import type { GeneratedSecret } from '@/business/apps/secrets.ts'
import type { GalliumClientsApi } from '@/services/gallium'

export const client: ObjectDescriptor<Client> = object({
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

const ssoSecretParams = object({
  signatureType: string
})

const generatedSecret: ObjectDescriptor<GeneratedSecret> = object({
  secret: string,
  signatureType: string.optional
})

export function generateNewAppAccessSecret(
  service: Service
): (id: number) => Promise<GeneratedSecret> {
  return (id: number) =>
    service
      .postRequest({ path: `clients/${id}/app-access-secret`, response: generatedSecret })
      .send()
}

export function generateNewSameSignOnSecret(
  service: Service
): (id: number, signatureType: string) => Promise<GeneratedSecret> {
  return (id: number, signatureType: string) =>
    service
      .postRequest({
        path: `clients/${id}/sso-secret`,
        request: ssoSecretParams,
        response: generatedSecret
      })
      .send({ signatureType })
}
