import type { GalliumRolesApi, GalliumUsersApi, PasswordModification } from '../users'
import { Fake } from './data'
import { ErrorCode, Problem } from '@/business/problem'
import type { Role, User } from '@/business/users'

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

export class FakeRolesService implements GalliumRolesApi {
  public readonly keyProperty = 'id'

  public async getAll(): Promise<Role[]> {
    await Fake.delay()
    return [Fake.role()]
  }

  public async get(id: number): Promise<Role> {
    await Fake.delay()
    if (id === 1) {
      return Fake.role()
    } else {
      throw new Problem('not found', ErrorCode.ItemNotFound)
    }
  }

  public create(): Role {
    return Fake.role()
  }

  public async save(): Promise<void> {
    await Fake.delay()
  }

  public async delete(): Promise<void> {
    await Fake.delay()
  }
}
