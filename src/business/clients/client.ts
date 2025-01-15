import { type SameSignOnInit, SameSignOn } from '.'

export interface ClientInit {
  id: number
  apiKey: string
  name: string
  granted: number
  revoked: number
  isEnabled: boolean
  hasAppAccess: boolean
  sameSignOn: SameSignOnInit | null
}

export class Client {
  private readonly _id: number
  private readonly _apiKey: string
  private readonly _name: string
  private readonly _granted: number
  private readonly _revoked: number
  private _isEnabled: boolean
  private readonly _hasAppAccess: boolean
  private _sameSignOn: SameSignOn | null

  public constructor(init: ClientInit) {
    this._id = init.id
    this._apiKey = init.apiKey ?? ''
    this._name = init.name
    this._granted = init.granted
    this._revoked = init.revoked
    this._isEnabled = init.isEnabled
    this._hasAppAccess = init.hasAppAccess
    this._sameSignOn = init.sameSignOn === null ? null : new SameSignOn(init.sameSignOn)
  }

  public get id(): number {
    return this._id
  }

  public get apiKey(): string {
    return this._apiKey
  }

  public get name(): string {
    return this._name
  }

  public get isEnabled(): boolean {
    return this._isEnabled
  }

  public set isEnabled(value: boolean) {
    this._isEnabled = value
  }

  public get granted(): number {
    return this._granted
  }

  public get revoked(): number {
    return this._revoked
  }

  public get hasAppAccess(): boolean {
    return this._hasAppAccess
  }

  public get hasDirectAccess(): boolean {
    return !this._hasAppAccess && (this._sameSignOn === null || this._sameSignOn.requiresApiKey)
  }

  public get hasSameSignOn(): boolean {
    return this._sameSignOn !== null
  }

  public get sameSignOn(): SameSignOn | null {
    return this._sameSignOn
  }

  public addSameSignOn(): void {
    if (!this.hasSameSignOn) {
      this._sameSignOn = new SameSignOn({
        scope: 0,
        signatureType: '',
        requiresApiKey: false,
        redirectUrl: '',
        logoUrl: null,
        displayName: null
      })
    }
  }
}
