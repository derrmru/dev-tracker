import { UseCaseError } from "./UseCaseError";

export type ValidationResultOr<T> = T | ValidationResult;

export class ValidationResult {
  private errors: UseCaseError[] = [];

  addError(error: UseCaseError): void {
    this.errors.push(error);
  }

  getErrors(): UseCaseError[] {
    return this.errors;
  }

  isValid(): boolean {
    return this.errors.length === 0;
  }
}
