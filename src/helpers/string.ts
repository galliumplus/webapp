export function titleCase(value: string): string {
  return value.replace(/(?<![a-zâàæêèéëîïôòœûùüç])./gi, (m) => m.toUpperCase())
}

export function ifEmpty<T>(value: string, alternative: T): string | T {
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : alternative
}
