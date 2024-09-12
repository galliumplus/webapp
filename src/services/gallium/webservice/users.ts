import type { GalliumUsersApi, PasswordModification } from '../users'
import { User, type UserInit } from '@/business/users'
import { type CollectionResource, type ObjectDescriptor, service, type Service } from '@hokaze/core'
import { object, string, number, boolean } from '@hokaze/core'

export const user: ObjectDescriptor<UserInit> = object({
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  role: number,
  year: string,
  deposit: number.nullable,
  isMember: boolean
})

const passwordModification: ObjectDescriptor<PasswordModification> = object({
  newPassword: string,
  currentPassword: string.optional,
  resetToken: string.optional
})

export class GalliumUserService implements GalliumUsersApi {
  private _usersResource: CollectionResource<UserInit>
  private _service: Service

  public constructor(service: Service) {
    this._usersResource = service.collection('users', user)
    this._service = service
  }

  async getAll(): Promise<User[]> {
    return (await this._usersResource.getAll()).map((init: UserInit) => new User(init))
  }

  public async getSelf(): Promise<User> {
    throw new Error('Method not implemented.')
  }

  public async changePassword(userId: string, password: PasswordModification): Promise<void> {
    return this._service
      .putRequest({ path: `users/${userId}/password`, request: passwordModification })
      .send(password)
  }

  public async canResetPassword(userId: string): Promise<boolean> {
    return this._service
      .getRequest({ path: `users/${userId}/reset-password`, response: boolean })
      .send()
  }

  public askForPasswordReset(userId: string, retryInit?: boolean): Promise<void> {
    let query = ''
    if (retryInit !== undefined) query += `?retryInit=${retryInit}`
    return this._service.postRequest({ path: `users/${userId}/reset-password${query}` }).send()
  }
}
