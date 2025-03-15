import type { BadResponseHandler } from '@hokaze/core'
import { ErrorCode, Problem } from '@/business/problem.ts'
import { useStore } from '@/composables'
import router from '@/router'

export class GalliumErrorHandler implements BadResponseHandler {
  private _redirectIfUnauthenticated: boolean

  public constructor(redirectIfUnauthenticated: boolean) {
    this._redirectIfUnauthenticated = redirectIfUnauthenticated
  }

  public async onBadResponse(response: Response): Promise<never> {
    let problem: Problem
    if (response.status === 401) {
      if (this._redirectIfUnauthenticated) {
        this.redirectToLogin()
        problem = new Problem(
          "Le jeton d'authentification semble ne plus être valide.",
          ErrorCode.Unauthenticated
        )
      } else {
        problem = new Problem('Informations de connexion invalides.', ErrorCode.Unauthenticated)
      }
    } else {
      problem = await this.galliumErrorToProblem(response)
    }
    throw problem
  }

  private async galliumErrorToProblem(response: Response): Promise<Problem> {
    let galliumError
    try {
      galliumError = await response.json()
    } catch {
      galliumError = undefined
    }
    if (typeof galliumError === 'object' && galliumError !== null && 'debugInfo' in galliumError) {
      console.debug('Informations de débogage disponibles :', galliumError.debugInfo)
    }
    return Problem.fromGalliumError(galliumError)
  }

  private redirectToLogin() {
    const store = useStore()
    store.session.clear()

    const currentRouteName = router.currentRoute.value.name
    let logInDestination
    if (currentRouteName !== null && typeof currentRouteName === 'string') {
      logInDestination = currentRouteName
    }
    router
      .push({ name: 'login', query: { to: logInDestination, disconnected: 'yes' } })
      .catch((err) => {
        console.error('Échec lors de la redirection vers la page de connexion', err)
        window.location.reload()
      })
  }
}
