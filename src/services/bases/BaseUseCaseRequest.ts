import { ValidationResult } from "./ValidationResult";

export abstract class BaseUseCaseRequest {
  abstract validate(): ValidationResult;
}
