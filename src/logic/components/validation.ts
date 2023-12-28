import { ErrorCode, Problem } from '@/logic'

/**
 * Une vérification sur une valeur saisie.
 */
export interface Validation<T> {
  /**
   * Effectue la vérification.
   * @param rawValue La valeur telle qu'elle a été saisie.
   * @param actualValue La valeur calculée contenue dans le champ.
   */
  checkInput(rawValue: string, actualValue: T): Problem | null
}

const blank = /^\s*$/

/**
 * Vérifie qu'une valeur saisie n'est pas laissée vide.
 * @param customMessage Le message à afficher quand le champ est vide.
 */
export function required(customMessage?: string): Validation<any> {
  let message = customMessage ?? 'Champ obligatoire'
  return {
    checkInput(rawValue: string): Problem | null {
      return rawValue === '' ? new Problem(message, ErrorCode.InvalidInput) : null
    }
  }
}

/**
 * Vérifie qu'une valeur saisie n'est pas laissée vide et contient au moins un caractère visible.
 * @param customMessage Le message à afficher quand le champ est vide.
 */
export function notBlank(customMessage?: string): Validation<string> {
  let message = customMessage ?? 'Champ obligatoire'
  return {
    checkInput(rawValue: string): Problem | null {
      return rawValue.match(blank) ? new Problem(message, ErrorCode.InvalidInput) : null
    }
  }
}
