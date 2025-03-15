import { Fake } from '.'
import type { GalliumRolesApi, GalliumUsersApi, PasswordModification } from '../users'
import type { User, Role } from '@/business/users'
import { FakeCollection } from '@/services/gallium/fake/generic'
import { role } from '@/services/gallium/webservice/users.ts'

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

export class FakeRolesService extends FakeCollection<Role, 'id'> implements GalliumRolesApi {
  public constructor() {
    super(role, 'id', [])
  }
}
