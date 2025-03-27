import { FakeRolesService } from './users'
import { Ref } from '@hokaze/core'
import { Client, type SsoClientPublicInfo } from '@/business/apps'
import { User, type Role } from '@/business/users'

export class Fake {
  public static delay(millis: number = 1500): Promise<void> {
    return new Promise((resolve, reject) => setTimeout(() => resolve(), millis))
  }

  public static user(): User {
    return new User({
      id: 'bob',
      firstName: 'bob',
      lastName: 'bolman',
      role: Ref.fromValue(new FakeRolesService(), Fake.role()),
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

  public static role(): Role {
    return {
      id: 1,
      name: 'Rôle test',
      permissions: 4095
    }
  }

  public static client(): Client {
    return new Client({
      id: 1,
      apiKey: 'test-api-key',
      granted: 4095,
      allowed: 0,
      hasAppAccess: false,
      isEnabled: true,
      name: 'Test',
      sameSignOn: null
    })
  }
}
