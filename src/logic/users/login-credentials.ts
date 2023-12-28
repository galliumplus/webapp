import { type InputValue, TextInputValue, notBlank, required } from '@/logic/components'
import { Problem } from '@/logic'

/**
 * Un identifiant et un mot de passe utilisés pour se connecter
 */
export default class LoginCredentials {
  private readonly _username: TextInputValue
  private readonly _password: TextInputValue

  /**
   * L'identifiant à saisir.
   */
  public get usernameInputValue(): InputValue {
    return this._username
  }

  /**
   * L'identifiant à utiliser pour se connecter.
   */
  public get username(): string {
    return this._username.value
  }

  /**
   * Le mot de passe à saisir.
   */
  public get passwordInputValue(): InputValue {
    return this._password
  }

  /**
   * Le mot de passe à utiliser pour se connecter.
   */
  public get password(): string {
    return this._password.value
  }

  /**
   * Si les informations ont bien été saisies.
   */
  public get areValid(): boolean {
    return this._username.isValid && this._password.isValid
  }

  public constructor() {
    this._username = new TextInputValue('', notBlank("Veuillez saisir votre nom d'utilisateur."))
    this._password = new TextInputValue('', required('Veuillez saisir votre mot de passe.'))
  }

  /**
   * Indique que les informations saisies ne sont pas correctes.
   * @param problem Le problème avec les informations de connexion saisies.
   */
  public report(problem: Problem) {
    this._password.reset(true)

    this._username.report(problem, this._password)
    this._password.report(problem, this._username)
  }

  /**
   * Réinitialise le nom d'utilisateur et le mot de passe.
   */
  public reset() {
    this._username.reset()
    this._password.reset()
  }
}
