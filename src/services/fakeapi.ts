import dayjs from 'dayjs'
import type { Api } from '.'
import { Session, User, Role, Permissions, Problem, ErrorCode } from '@/logic'

export default class FakeApi implements Api {
  private delay(millis: number = 500): Promise<void> {
    return new Promise((resolve, reject) => setTimeout(() => resolve(), millis))
  }

  public async login(userId: string, password: string): Promise<Session> {
    await this.delay()

    if (userId === 'bob' && password === 'motdepasse') {
      return new Session(
        'fake-session-token',
        dayjs().add(24, 'hour'),
        new User('bob', 'Bob Bolman', new Role(0, 'Adhérent', Permissions.NONE), '1A', true),
        Permissions.NONE
      )
    } else {
      throw new Problem(
        "L'identifiant et le mot de passe ne correspondent pas.",
        ErrorCode.UNAUTHENTICATED
      )
    }
  }
}
