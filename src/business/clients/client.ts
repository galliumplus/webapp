import { GalliumPermissions } from '@/business/users'

export interface ClientSummary {
  id: number
  name: string
  isEnabled: boolean
}

export interface ClientInit extends ClientSummary {
  apiKey?: string
  granted?: number
  revoked?: number
}

export class Client {
  private readonly _id: number
  private readonly _apiKey: string
  private readonly _name: string
  private readonly _granted: GalliumPermissions
  private readonly _revoked: GalliumPermissions
  private readonly _isEnabled: boolean

  public constructor(init: ClientInit) {
    this._id = init.id
    this._apiKey = init.apiKey ?? ''
    this._name = init.name
    this._granted = new GalliumPermissions(init.granted)
    this._revoked = new GalliumPermissions(init.revoked)
    this._isEnabled = init.isEnabled
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

  public get granted(): GalliumPermissions {
    return this._granted
  }

  public get revoked(): GalliumPermissions {
    return this._revoked
  }
}
