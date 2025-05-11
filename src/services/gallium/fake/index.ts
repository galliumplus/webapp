import type { GalliumApi, GalliumClientsApi, GalliumRolesApi, GalliumUsersApi } from '..'
import { FakeGalliumClientsService } from './clients'
import { Fake } from './data'
import { FakeGalliumUserService, FakeRolesService } from './users'
import dayjs from 'dayjs'
import type { LoggedIn, LoginCredentials } from '@/business/access'
import type { SsoClientPublicInfo } from '@/business/apps'
import { Problem } from '@/business/problem'
import { GalliumPermission } from '@/business/users'

export class FakeGalliumService implements GalliumApi {
  public async logIn(credentials: LoginCredentials): Promise<LoggedIn> {
    await Fake.delay()

    if (credentials.username === 'bob' && credentials.password === 'motdepasse') {
      return {
        token: 'fake-session-token',
        expiration: dayjs().add(24, 'hour'),
        user: Fake.user(),
        permissions: 0xfff
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

  public async getSsoPublicInfo(): Promise<SsoClientPublicInfo> {
    await Fake.delay()
    return Fake.ssoClientPublicInfo()
  }
}
