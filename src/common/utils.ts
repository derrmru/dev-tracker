export type Nullable<T> = T | null | undefined;

export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
