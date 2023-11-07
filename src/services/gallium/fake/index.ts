import dayjs from 'dayjs'
import type { GalliumApi } from '..'
import type { GalliumUserApi } from '../users'
import {Problem, ErrorCode} from '@/logic'
import { Session, User, Role, Permissions } from '@/logic/users'
import FakeGalliumUserService from './users'

export class Fake {
  public static delay(millis: number = 1500): Promise<void> {
    return new Promise((resolve, reject) => setTimeout(() => resolve(), millis))
  }

  public static user(): User {
    return new User('bob', 'Bob Bolman', new Role(0, 'Adhérent', Permissions.NONE), '1A', true)
  }
}

export class FakeGalliumService implements GalliumApi {
  public async login(userId: string, password: string): Promise<Session> {
    await Fake.delay()

    if (userId === 'bob' && password === 'motdepasse') {
      return new Session(
        'fake-session-token',
        dayjs().add(24, 'hour'),
        Fake.user(),
        Permissions.NONE
      )
    } else {
      throw new Problem(
        "L'identifiant et le mot de passe ne correspondent pas.",
        ErrorCode.UNAUTHENTICATED
      )
    }
  }

  public get users(): GalliumUserApi {
    return new FakeGalliumUserService()
  }
}
