import { z } from "zod";
import { BaseUseCaseRequest } from "../../bases/BaseUseCaseRequest";
import { UseCaseError } from "../../bases/UseCaseError";
import { ValidationResult } from "../../bases/ValidationResult";

export class FindUserUseCaseRequest extends BaseUseCaseRequest {
  private userId: number;

  private constructor(userId: number) {
    super();
    this.userId = userId;
  }

  validate(): ValidationResult {
    const validationResult = new ValidationResult();
    const result = z
      .object({
        userId: z.number().int().positive("User ID must be a positive integer"),
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

  static create(userId: number): FindUserUseCaseRequest {
    return new FindUserUseCaseRequest(userId);
  }

  getUserId(): number {
    return this.userId;
  }
}
