import z from "zod";
import { BaseUseCaseRequest } from "../../../bases/BaseUseCaseRequest";
import { ValidationResult } from "../../../bases/ValidationResult";
import { isDefined, Nullable } from "../../../../common/utils";
import { UseCaseError } from "../../../bases/UseCaseError";

export class UpdateChildUseCaseRequest extends BaseUseCaseRequest {
  constructor(
    private readonly childId: number,
    private readonly name: Nullable<string>,
    private readonly dateOfBirth: Nullable<Date>,
    private readonly userId: number
  ) {
    super();
  }

  validate(): ValidationResult {
    const validationResult = new ValidationResult();
    let validation: { [key: string]: any } = {
      childId: z.number().min(1),
      name: z.string().min(3).max(100).optional(),
      dateOfBirth: z.date().optional(),
      userId: z.number().min(1),
    };
    if (!this.name && !this.dateOfBirth) {
      validationResult.addError(
        UseCaseError.create({
          message:
            "At least one field (name or dateOfBirth) must be provided for update",
          code: 422,
        })
      );
    }
    const result = z.object(validation).safeParse({
      childId: this.childId,
      name: this.name,
      dateOfBirth: this.dateOfBirth,
      userId: this.userId,
    });
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

  getName(): Nullable<string> {
    return this.name;
  }

  getDateOfBirth(): Nullable<Date> {
    return this.dateOfBirth;
  }

  getUserId(): number {
    return this.userId;
  }
}
