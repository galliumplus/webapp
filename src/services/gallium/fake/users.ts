import { type User } from '@/business/users'
import type { GalliumUsersApi, PasswordModification } from '../users'
import { Fake } from '.'

export class FakeGalliumUserService implements GalliumUsersApi {
  public async getAll(): Promise<User[]> {
    await Fake.delay()
    return [Fake.user()]
  }

  public async getSelf(): Promise<User> {
    await Fake.delay()
    return Fake.user()
  }

  public async changePassword(
    userId: string,
    passwordModification: PasswordModification
  ): Promise<void> {
    await Fake.delay()
  }

  public canResetPassword(userId: string): Promise<boolean> {
    return Promise.resolve(false)
  }

  public askForPasswordReset(userId: string, retryInit?: boolean): Promise<void> {
    return Promise.resolve(undefined)
  }
}
