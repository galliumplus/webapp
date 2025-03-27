import type { Role, User } from '@/business/users'

export interface PasswordModification {
  newPassword: string
  currentPassword?: string
  resetToken?: string
}

export interface GalliumRolesApi {
  getAll(): Promise<Role[]>
  create(): Role
  save(role: Role): Promise<void>
  delete(role: Role): Promise<void>
}

export interface GalliumUsersApi {
  getAll(): Promise<User[]>
  getSelf(): Promise<User>

  canResetPassword(userId: string): Promise<boolean>
  askForPasswordReset(userId: string, retryInit?: boolean): Promise<void>
  changePassword(userId: string, passwordModification: PasswordModification): Promise<void>
}
