import dayjs from 'dayjs'
import type { Api, UserApi } from '.'
import { Session, User, Role, Permissions, Problem, ErrorCode } from '@/logic'

class Fake {
  public static delay(millis: number = 500): Promise<void> {
    return new Promise((resolve, reject) => setTimeout(() => resolve(), millis))
  }

  public static user(): User {
    return new User('bob', 'Bob Bolman', new Role(0, 'Adhérent', Permissions.NONE), '1A', true)
  }
}

export default class FakeApi implements Api {
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

  public get users(): FakeUserApi { return new FakeUserApi() }
}

class FakeUserApi implements UserApi {
    public async self(): Promise<User> {
      await Fake.delay()
      return Fake.user()
    }
}