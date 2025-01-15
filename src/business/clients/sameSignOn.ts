import _ from 'lodash'
import { NumberFlag } from 'multiflag'
import { ifEmpty } from '@/helpers'

export interface SsoClientPublicInfo {
  displayName: string
  logoUrl: string | null
  scope: number
}

export interface SameSignOnInit {
  signatureType: string
  scope: number
  displayName: string | null
  redirectUrl: string
  logoUrl: string | null
  requiresApiKey: boolean
}

/**
 * Les différents niveaux d'accès aux données des utilisateurs par le portail SSO.
 */
export class SameSignOnScope extends NumberFlag {
  /**
   * Accès au profil de l'utilisateur (nom et prénom).
   */
  public static readonly Identity: SameSignOnScope = NumberFlag.withValue(0x01)

  /**
   * Accès à l'adresse mail de l'utilisateur.
   */
  public static readonly Email: SameSignOnScope = NumberFlag.withValue(0x02)

  /**
   * Accès au rôle de l'utilisateur.
   */
  public static readonly Role: SameSignOnScope = NumberFlag.withValue(0x04)

  /**
   * Accès à l'API Gallium en tant que l'utilisateur connecté. Si cette portée est présente, toutes
   * les informations des autres portées sont accessible via l'API.
   */
  public static readonly Gallium: SameSignOnScope = NumberFlag.withValue(0x100)
}

export class SameSignOn implements SameSignOnInit {
  private _signatureType: string
  private _scope: number
  private _displayName: string
  private _redirectUrl: string
  private _logoUrl: string

  public constructor(init: SameSignOnInit) {
    this._signatureType = init.signatureType
    this._scope = init.scope
    this._displayName = init.displayName ?? ''
    this._redirectUrl = init.redirectUrl
    this._logoUrl = init.logoUrl ?? ''
  }

  public get signatureType(): string {
    return this._signatureType
  }

  public get scope(): number {
    return this._scope
  }

  public get displayName(): string | null {
    return ifEmpty(this._displayName, null)
  }

  public get inputDisplayName(): string {
    return this._displayName
  }

  public set inputDisplayName(value: string) {
    this._displayName = value
  }

  public get redirectUrl(): string {
    return this._redirectUrl
  }

  public set redirectUrl(value: string) {
    this._redirectUrl = value
  }

  public get logoUrl(): string | null {
    return ifEmpty(this._logoUrl, null)
  }

  public get inputLogoUrl(): string {
    return this._logoUrl
  }

  public set inputLogoUrl(value: string) {
    this._logoUrl = value
  }

  public get requiresApiKey(): boolean {
    return SameSignOnScope.Gallium.in(this._scope)
  }
}
