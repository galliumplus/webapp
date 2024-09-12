import type { SsoClientPublicInfo } from '@/business/clients/sameSignOn'

export interface LoginClient {
  name: string
  logoUrl?: string
  isSelf: boolean
}

export class SelfLoginClient implements LoginClient {
  public readonly isSelf = true
  public readonly name = 'Gallium+'
}

export class SsoLoginClient implements LoginClient {
  private readonly _name: string
  private readonly _logoUrl: string

  public constructor(client: SsoClientPublicInfo) {
    this._name = client.displayName
    this._logoUrl = client.logoUrl
  }

  public readonly isSelf = false

  public get name(): string {
    return this._name
  }

  public get logoUrl(): string {
    return this._logoUrl
  }
}
