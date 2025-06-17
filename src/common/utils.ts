export type Nullable<T> = T | null;

export function isNullOrUndefined<T>(
  value: T | undefined | null
): value is undefined | null {
  return value === null || value === undefined;
}

export function isNotNullOrUndefined<T>(
  value: T | undefined | null
): value is T {
  return !isNullOrUndefined(value);
}
