import z from "zod";
import { BaseUseCaseRequest } from "../../../bases/BaseUseCaseRequest";
import { ValidationResult } from "../../../bases/ValidationResult";
import { UseCaseError } from "../../../bases/UseCaseError";

export class FindAllChildrenUseCaseRequest extends BaseUseCaseRequest {
  constructor(private userId: number) {
    super();
  }

  validate(): ValidationResult {
    const validationResult = new ValidationResult();
    const result = z
      .object({
        userId: z.number().min(1),
      })
      .safeParse({ userId: this.userId });
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

  getUserId(): number {
    return this.userId;
  }
}
