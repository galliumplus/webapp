import type { Ref } from 'vue'
import { ref, watch, watchEffect } from 'vue'
import { Problem } from '@/logic'
import type { Validation } from './validation'

/**
 * Une valeur générique saisie par l'utilisateur.
 */
export interface InputValue {
  /**
   * La valeur saisie sous forme de texte.
   */
  get ref(): Ref<string>

  /**
   * Le problème avec la valeur saisie, s'il y en a un.
   */
  get problem(): Ref<Problem | null>

  /**
   * Indique que cette valeur n'est pas correcte.
   * @param problem Le problème avec la valeur saisie.
   * @param otherOrigins d'autres valeur saisies qui auraient pu causer le problème.
   */
  report(problem: Problem, ...otherOrigins: InputValue[]): void

  /**
   * Réinitialise cette valeur.
   */
  reset(): void

  /**
   * Indique qu'une autre `InputValue` qui avait causé un problème a changé.
   */
  relatedChanges(): void
}

enum ChecksEnabled {
  Yes,
  No,
  NotNextUpdate
}

abstract class GenericInputValue<T> implements InputValue {
  private readonly _ref: Ref<string>
  private readonly _problem: Ref<Problem | null>
  private readonly _checks: Validation<T>[]
  private _problemOtherOrigins: InputValue[]
  private _checksEnabled: ChecksEnabled

  public get ref(): Ref<string> {
    return this._ref
  }

  public get problem(): Ref<Problem | null> {
    return this._problem
  }

  public abstract get value(): T

  public abstract set value(value: T)

  protected constructor(initialValue: string, ...checks: Validation<T>[]) {
    this._ref = ref(initialValue)
    this._problem = ref(null)
    this._checks = checks
    this._problemOtherOrigins = []
    this._checksEnabled = ChecksEnabled.Yes

    watch(this._ref, this.onValueChanged.bind(this))
  }

  public get isValid(): boolean {
    this.onValueChanged()
    return this._problem.value === null
  }

  public report(problem: Problem, ...otherOrigins: InputValue[]) {
    this._problem.value = problem
    this._problemOtherOrigins = otherOrigins
  }

  private onValueChanged() {
    switch (this._checksEnabled) {
      case ChecksEnabled.Yes:
        this._checksEnabled = ChecksEnabled.No

        this._problem.value =
          this._checks
            .map((check) => check.checkInput(this._ref.value, this.value))
            .find((checkResult) => checkResult !== null) ?? null

        for (const otherOrigin of this._problemOtherOrigins) {
          otherOrigin.relatedChanges()
        }
        this._problemOtherOrigins = []

        this._checksEnabled = ChecksEnabled.Yes
        break

      case ChecksEnabled.NotNextUpdate:
        // on ne fait rien pour cette fois et on ré-active
        this._checksEnabled = ChecksEnabled.Yes
        break
    }
  }

  public reset(noChecks: boolean = false) {
    if (noChecks) this._checksEnabled = ChecksEnabled.NotNextUpdate
    this._ref.value = ''

    this._problem.value = null
  }

  public relatedChanges() {
    this.onValueChanged()
  }
}

/**
 * Du texte saisi par l'utilisateur.
 */
export class TextInputValue extends GenericInputValue<string> {
  public override get value(): string {
    return this.ref.value
  }

  public override set value(value: string) {
    this.ref.value = value
  }

  /**
   * Crée une nouvelle valeur de texte à saisir.
   * @param initialValue La valeur par défaut.
   * @param checks Des contraintes à enforcer.
   */
  public constructor(initialValue: string, ...checks: Validation<string>[]) {
    super(initialValue, ...checks)
  }
}
