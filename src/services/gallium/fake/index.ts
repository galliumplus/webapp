import dayjs from 'dayjs'
import type { GalliumApi, GalliumClientsApi } from '..'
import type { GalliumUsersApi } from '../users'
import { GalliumPermissions, User } from '@/business/users'
import { FakeGalliumUserService } from './users'
import type { LoginCredentials, LoggedIn } from '@/business/access'
import { Problem } from '@/business/problem'
import type { SsoClientPublicInfo } from '@/business/clients'
import { FakeGalliumClientsService } from './clients'

export class Fake {
  public static delay(millis: number = 1500): Promise<void> {
    return new Promise((resolve, reject) => setTimeout(() => resolve(), millis))
  }

  public static user(): User {
    return new User({
      id: 'bob',
      firstName: 'bob',
      lastName: 'bolman',
      role: 0,
      year: '1A',
      isMember: true,
      email: 'bob@example.com',
      deposit: null
    })
  }

  public static ssoClientPublicInfo(): SsoClientPublicInfo {
    return {
      displayName: 'Démo',
      logoUrl: 'https://res.cloudinary.com/louisdevie/image/upload/demo-logo.png'
    }
  }
}

export class FakeGalliumService implements GalliumApi {
  public async logIn(credentials: LoginCredentials): Promise<LoggedIn> {
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

  public get users(): GalliumUsersApi {
    return new FakeGalliumUserService()
  }

  public get clients(): GalliumClientsApi {
    return new FakeGalliumClientsService()
  }
}
