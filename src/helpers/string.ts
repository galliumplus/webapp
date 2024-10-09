export function titleCase(value: string): string {
  return value.replace(/(?=[^a-zâàæêèéëîïôòœûùüç])./gi, (m) => m.toUpperCase())
}
