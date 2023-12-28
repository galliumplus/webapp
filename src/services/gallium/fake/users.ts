import type { User } from '@/logic/users'
import type { GalliumUserApi, PasswordModification } from '../users'
import { Fake } from '.'

export default class FakeGalliumUserService implements GalliumUserApi {
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
}
