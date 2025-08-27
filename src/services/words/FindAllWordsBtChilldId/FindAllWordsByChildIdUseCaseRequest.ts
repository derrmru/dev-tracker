import { z } from "zod";
import { BaseUseCaseRequest } from "../../bases/BaseUseCaseRequest";
import { ValidationResult } from "../../bases/ValidationResult";
import { UseCaseError } from "../../bases/UseCaseError";

export class FindAllWordsByChildIdUseCaseRequest extends BaseUseCaseRequest {
  constructor(private readonly childId: number) {
    super();
    this.childId = childId;
  }

  static create(childId: number): FindAllWordsByChildIdUseCaseRequest {
    return new FindAllWordsByChildIdUseCaseRequest(childId);
  }

  validate(): ValidationResult {
    const validationResult = new ValidationResult();
    const result = z
      .object({
        childId: z
          .number()
          .int()
          .positive("Child ID must be a positive integer"),
      })
      .safeParse({
        childId: this.childId,
      });

    console.log("Validation result:", result);
    if (!result.success) {
      result.error.issues.forEach((error) => {
        validationResult.addError(
          UseCaseError.create({
            message: error.message,
            code: 422,
          })
        );
      });
    }
    return validationResult;
  }

  getChildId(): number {
    return this.childId;
  }
}
