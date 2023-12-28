import dayjs from 'dayjs'
import type { GalliumApi } from '..'
import type { GalliumUserApi } from '../users'
import { Problem } from '@/logic'
import { type Session, type User, GalliumPermissions, LoginCredentials } from '@/logic/users'
import FakeGalliumUserService from './users'
import type { GalliumClientApi } from '@/services/gallium/clients'
import FakeGalliumClientsService from '@/services/gallium/fake/clients'
import type { LoginClient } from '@/logic/clients'

export class Fake {
  public static delay(millis: number = 1500): Promise<void> {
    return new Promise((resolve, reject) => setTimeout(() => resolve(), millis))
  }

  public static user(): User {
    return {
      id: 'bob',
      name: 'Bob Bolman',
      role: { id: 0, name: 'Adhérent', permissions: new GalliumPermissions() },
      year: '1A',
      isMember: true
    }
  }

  public static ssoLoginClient(): LoginClient {
    return {
      name: 'Démo',
      logoUrl: 'https://res.cloudinary.com/louisdevie/image/upload/demo-logo.png',
      isGallium: false
    }
  }
}

export class FakeGalliumService implements GalliumApi {
  public async logIn(credentials: LoginCredentials): Promise<Session> {
    await Fake.delay()

    if (credentials.username === 'bob' && credentials.password === 'motdepasse') {
      return {
        token: 'fake-session-token',
        expiration: dayjs().add(24, 'hour'),
        user: Fake.user(),
        permissions: new GalliumPermissions()
      }
    } else {
      throw new Problem('Identifiant ou mot de passe invalide.')
    }
  }

  public async ssoLogIn(apiKey: string, credentials: LoginCredentials): Promise<string> {
    await Fake.delay()

    if (credentials.username === 'bob' && credentials.password === 'motdepasse') {
      return 'https://ma-super-appli.fr/login?token=jwt-goes-here'
    } else {
      throw new Problem('Identifiant ou mot de passe invalide.')
    }
  }

  public get users(): GalliumUserApi {
    return new FakeGalliumUserService()
  }

  public get clients(): GalliumClientApi {
    return new FakeGalliumClientsService()
  }
}
