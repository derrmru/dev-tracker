import { z } from "zod/v4";
import { BaseUseCaseRequest } from "../../bases/BaseUseCaseRequest";
import { ValidationResult } from "../../bases/ValidationResult";
import { UseCaseError } from "../../bases/UseCaseError";

export class CreateUserUseCaseRequest extends BaseUseCaseRequest {
  constructor(
    private readonly username: string,
    private readonly email: string
  ) {
    super();
    this.username = username;
    this.email = email;
  }

  validate(): ValidationResult {
    const validationResult = new ValidationResult();
    const result = z
      .object({
        username: z
          .string()
          .min(3, "Username must be at least 3 characters long"),
        email: z.email("Invalid email format"),
      })
      .safeParse({
        username: this.username,
        email: this.email,
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

  getUsername(): string {
    return this.username;
  }

  getEmail(): string {
    return this.email;
  }
}
