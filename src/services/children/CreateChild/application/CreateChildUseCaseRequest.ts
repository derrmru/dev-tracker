import { z } from "zod/v4";
import { BaseUseCaseRequest } from "../../../bases/BaseUseCaseRequest";
import { ValidationResult } from "../../../bases/ValidationResult";
import { UseCaseError } from "../../../bases/UseCaseError";
import { Word } from "../../../shared/domain/Word";

export class CreateChildUseCaseRequest extends BaseUseCaseRequest {
  constructor(
    private readonly name: string,
    private readonly dateOfBirth: Date,
    private readonly userId: number
  ) {
    super();
    this.name = name;
    this.dateOfBirth = dateOfBirth;
    this.userId = userId;
  }

  validate(): ValidationResult {
    const validationResult = new ValidationResult();
    const result = z
      .object({
        name: z.string().min(3, "Name must be at least 3 characters long"),
        dateOfBirth: z.date().min(new Date(0), "Invalid date"),
        userId: z.number().min(1, "Invalid user ID"),
      })
      .safeParse({
        name: this.name,
        dateOfBirth: this.dateOfBirth,
        userId: this.userId,
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

  getName(): string {
    return this.name;
  }

  getDateOfBirth(): Date {
    return this.dateOfBirth;
  }

  getUserId(): number {
    return this.userId;
  }
}
