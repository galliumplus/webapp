/**
 * Un client auquel on peut se connecter.
 */
export interface LoginClient {
  readonly name: string
  readonly logoUrl?: string
  readonly isGallium: boolean
}
