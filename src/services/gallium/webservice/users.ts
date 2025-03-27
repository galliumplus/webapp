import type { GalliumRolesApi, GalliumUsersApi, PasswordModification } from '../users'
import { type CollectionResource, type ObjectDescriptor, service, type Service } from '@hokaze/core'
import { object, string, number, boolean, ref } from '@hokaze/core'
import { type Role, User } from '@/business/users'

export class GalliumRolesService implements GalliumRolesApi {
  private readonly _resource: CollectionResource<Role>

  public constructor(service: Service) {
    this._resource = service.collection(
      'roles',
      object({
        id: number,
        name: string,
        permissions: number
      })
    )
  }

  public get asResource(): CollectionResource<Role> {
    return this._resource
  }

  public getAll(): Promise<Role[]> {
    return this._resource.getAll()
  }

  public create(): Role {
    return this._resource.create()
  }

  public save(role: Role): Promise<void> {
    return this._resource.save(role)
  }

  public delete(role: Role): Promise<void> {
    return this._resource.delete(role)
  }
}

export class GalliumUsersService implements GalliumUsersApi {
  private readonly _resource: CollectionResource<User>
  private _service: Service
  private _descriptor: ObjectDescriptor<User>

  public constructor(service: Service, roles: GalliumRolesService) {
    this._descriptor = object({
      id: string,
      firstName: string,
      lastName: string,
      email: string,
      role: ref(roles.asResource),
      year: string,
      deposit: number.nullable,
      isMember: boolean
    }).asInstanceOf(User)

    this._resource = service.collection('users', this._descriptor)

    this._service = service
  }

  public get descriptor(): ObjectDescriptor<User> {
    return this._descriptor
  }

  public getAll(): Promise<User[]> {
    return this._resource.getAll()
  }

  public getSelf(): Promise<User> {
    return this._resource.get('@me')
  }

  public changePassword(userId: string, password: PasswordModification): Promise<void> {
    return this._service
      .putRequest({
        path: `users/${userId}/password`,
        request: object({
          newPassword: string,
          currentPassword: string.optional,
          resetToken: string.optional
        }) as ObjectDescriptor<PasswordModification>
      })
      .send(password)
  }

  public canResetPassword(userId: string): Promise<boolean> {
    return this._service
      .getRequest({ path: `users/${userId}/reset-password`, response: boolean })
      .send()
  }

  public askForPasswordReset(userId: string, retryInit?: boolean): Promise<void> {
    let query = ''
    if (retryInit !== undefined) query += `?retryInit=${retryInit}`
    return this._service.postRequest({ path: `users/${userId}/reset-password${query}` }).send()
  }
}
