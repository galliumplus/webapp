import type { LocationQueryValue, RouteParamValue } from 'vue-router'

type AnyParam = LocationQueryValue | LocationQueryValue[] | RouteParamValue | RouteParamValue[]

export function first(param: AnyParam): string | null {
  if (Array.isArray(param)) {
    return param[0]
  } else {
    return param
  }
}

export function firstOrDefault(
  query: LocationQueryValue | LocationQueryValue[],
  defaultValue: string
): string {
  return first(query) ?? defaultValue
}
