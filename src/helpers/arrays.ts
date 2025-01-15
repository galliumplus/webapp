export function updateFirst<T>(
  array: T[],
  predicate: (value: T, index: number, obj: T[]) => unknown,
  value: T
): T[] {
  array[array.findIndex(predicate)] = value
  return array
}

export function deleteFirst<T>(
  array: T[],
  predicate: (value: T, index: number, obj: T[]) => unknown
): T[] {
  array.splice(array.findIndex(predicate), 1)
  return array
}
