import type { Dayjs } from 'dayjs'
import { GalliumPermissions, type User } from '@/business/users'

export interface LoggedIn {
  readonly token: string
  readonly expiration: Dayjs
  readonly user: User
  readonly permissions: GalliumPermissions
}
