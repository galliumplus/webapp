import type { GalliumApi, GalliumClientsApi, GalliumRolesApi, GalliumUsersApi } from '..'
import { FakeGalliumClientsService } from './clients'
import { FakeGalliumUserService, FakeRolesService } from './users'
import dayjs from 'dayjs'
import type { LoggedIn } from '@/business/access'
import { LoginCredentials } from '@/business/access'
import type { SsoClientPublicInfo } from '@/business/apps'
import { Problem } from '@/business/problem'
import { User } from '@/business/users'

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
      scope: 0,
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
        permissions: 0
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

  public get roles(): GalliumRolesApi {
    return new FakeRolesService()
  }

  public async getSsoPublicInfo(apiKey: string): Promise<SsoClientPublicInfo> {
    await Fake.delay()
    return {
      displayName: '',
      logoUrl: null,
      scope: 0
    }
  }
}
