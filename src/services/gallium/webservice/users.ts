import type { GalliumUserApi, PasswordModification } from '../users'
import RestService from '@/services/rest'
import type { User } from '@/logic/users'

export default class GalliumUserService extends RestService implements GalliumUserApi {
  public async getSelf(): Promise<User> {
    throw new Error('Method not implemented.')
  }

  public async changePassword(
    userId: string,
    passwordModification: PasswordModification
  ): Promise<void> {
    await this.put(`users/${userId}/password`, passwordModification)
  }
}
