import type { Problem } from '@/business/problem.ts'

export function titleCase(value: string): string {
  return value.replace(/(?<![a-zâàæêèéëîïôòœûùüç])./gi, (m) => m.toUpperCase())
}

export function ifEmpty<Alt>(value: string, alternative: Alt): string | Alt {
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : alternative
}

export function messageOf(problem: Problem | string): string {
  if (typeof problem === 'string') {
    return problem
  } else {
    return problem.message
  }
}
