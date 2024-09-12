export const Done = Symbol('done')

export const Indeterminate = Symbol('indeterminate')

/**
 * `Done` indique que l'opération est terminée, `Indeterminate` indique que l'opération est en cours mais qu'on ne sait
 * pas quand elle se terminera, et un nombre entre 0 et 1 indique la progression (0 = début, 1 = fin).
 */
export type Progress = typeof Done | typeof Indeterminate | number
