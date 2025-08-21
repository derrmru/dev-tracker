import { BaseUseCaseRequest } from "../../bases/BaseUseCaseRequest";
import { ValidationResult } from "../../bases/ValidationResult";

export class FindAllUsersUseCaseRequest extends BaseUseCaseRequest {
  validate(): ValidationResult {
    const validationResult = new ValidationResult();
    return validationResult;
  }
}
