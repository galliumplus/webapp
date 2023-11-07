import { User } from '@/logic/users'

export interface PasswordModification {
  newPassword: string
  currentPassword?: string
  resetToken?: string 
}

export interface GalliumUserApi {
  getSelf(): Promise<User>

  changePassword(userId: string, passwordModification: PasswordModification): Promise<void>
}