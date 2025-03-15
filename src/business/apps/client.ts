import { type SameSignOnInit, SameSignOn } from '.'

export interface ClientInit {
  id: number
  apiKey: string
  name: string
  allowed: number
  granted: number
  isEnabled: boolean
  hasAppAccess: boolean
  sameSignOn: SameSignOnInit | null
}

export class Client {
  private readonly _id: number
  private readonly _apiKey: string
  private _name: string
  private _allowed: number
  private _granted: number
  private _isEnabled: boolean
  private _hasAppAccess: boolean
  private _sameSignOn: SameSignOn | null

  public constructor(init: ClientInit) {
    this._id = init.id
    this._apiKey = init.apiKey
    this._name = init.name
    this._allowed = init.allowed
    this._granted = init.granted
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

  public set name(value: string) {
    this._name = value
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

  public set granted(value: number) {
    this._granted = value
  }

  public get allowed(): number {
    return this._allowed
  }

  public set allowed(value: number) {
    this._allowed = value
  }

  public get hasAppAccess(): boolean {
    return this._hasAppAccess
  }

  public set hasAppAccess(value: boolean) {
    this._hasAppAccess = value
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

  public removeSameSignOn(): void {
    this._sameSignOn = null
  }
}
