import { BaseUseCaseRequest } from "../../../bases/BaseUseCaseRequest";
import { ValidationResult } from "../../../bases/ValidationResult";

export class FindAllChildrenUseCaseRequest extends BaseUseCaseRequest {
  validate(): ValidationResult {
    const validationResult = new ValidationResult();
    return validationResult;
  }
}
