import type { Dayjs } from '@hokaze/dayjs'
import type { User } from '@/business/users'

export interface LoggedIn {
  readonly token: string
  readonly expiration: Dayjs
  readonly user: User
  readonly permissions: number
}
