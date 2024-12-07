import type { SsoClientPublicInfo } from '@/business/clients/sameSignOn'

export interface LoginClient {
  name: string
  logoUrl?: string
  isSelf: boolean
  scope?: number
}

export class SelfLoginClient implements LoginClient {
  public readonly isSelf = true
  public readonly name = 'Gallium+'
}

export class SsoLoginClient implements LoginClient {
  private readonly _name: string
  private readonly _logoUrl: string | undefined
  private readonly _scope: number

  public constructor(client: SsoClientPublicInfo) {
    this._name = client.displayName
    this._logoUrl = client.logoUrl ?? undefined
    this._scope = client.scope
  }

  public readonly isSelf = false

  public get name(): string {
    return this._name
  }

  public get logoUrl(): string | undefined {
    return this._logoUrl
  }

  public get scope(): number {
    return this._scope
  }
}
