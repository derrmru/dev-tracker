import { z } from "zod";
import { BaseUseCaseRequest } from "../../../bases/BaseUseCaseRequest";
import { UseCaseError } from "../../../bases/UseCaseError";
import { ValidationResult } from "../../../bases/ValidationResult";

export class FindChildUseCaseRequest extends BaseUseCaseRequest {
  private childId: number;
  private userId: number;

  private constructor(childId: number, userId: number) {
    super();
    this.childId = childId;
    this.userId = userId;
  }

  validate(): ValidationResult {
    const validationResult = new ValidationResult();
    const result = z
      .object({
        childId: z
          .number()
          .int()
          .positive("Child ID must be a positive integer"),
        userId: z.number().int().positive("User ID must be a positive integer"),
      })
      .safeParse({ childId: this.childId, userId: this.userId });
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

  static create(childId: number, userId: number): FindChildUseCaseRequest {
    return new FindChildUseCaseRequest(childId, userId);
  }

  getChildId(): number {
    return this.childId;
  }

  getUserId(): number {
    return this.userId;
  }
}
