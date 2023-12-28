import { Dayjs } from 'dayjs'
import { GalliumPermissions } from '@/logic/users/gallium-permissions'

export { GalliumPermissions, GalliumPermission } from './gallium-permissions'
export { default as LoginCredentials } from './login-credentials'

export interface Role {
  readonly id: number
  readonly name: string
  readonly permissions: GalliumPermissions
}

export interface User {
  readonly id: string
  readonly name: string
  readonly role: Role
  readonly year: string
  readonly isMember: boolean
}

export interface Session {
  readonly token: string
  readonly expiration: Dayjs
  readonly user: User
  readonly permissions: GalliumPermissions
}
