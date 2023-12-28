import type { LocationQueryValue } from 'vue-router'

export default class Query {
  public static first(query: LocationQueryValue | LocationQueryValue[]): string | null {
    if (Array.isArray(query)) {
      return query[0]
    } else {
      return query
    }
  }

  public static firstOrDefault(
    query: LocationQueryValue | LocationQueryValue[],
    defaultValue: string
  ): string {
    return Query.first(query) ?? defaultValue
  }
}
