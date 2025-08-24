import z from "zod";
import { BaseUseCaseRequest } from "../../bases/BaseUseCaseRequest";
import { ValidationResult } from "../../bases/ValidationResult";
import { UseCaseError } from "../../bases/UseCaseError";

export class DeleteChildUseCaseRequest extends BaseUseCaseRequest {
  private readonly childId: number;

  private constructor(childId: number) {
    super();
    this.childId = childId;
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
      .safeParse({ childId: this.childId });
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

  static create(childId: number): DeleteChildUseCaseRequest {
    return new DeleteChildUseCaseRequest(childId);
  }

  getChildId(): number {
    return this.childId;
  }
}
