import { type User } from '@/business/users'

export interface PasswordModification {
  newPassword: string
  currentPassword?: string
  resetToken?: string
}

export interface GalliumUsersApi {
  getAll(): Promise<User[]>
  getSelf(): Promise<User>

  canResetPassword(userId: string): Promise<boolean>
  askForPasswordReset(userId: string, retryInit?: boolean): Promise<void>
  changePassword(userId: string, passwordModification: PasswordModification): Promise<void>
}
