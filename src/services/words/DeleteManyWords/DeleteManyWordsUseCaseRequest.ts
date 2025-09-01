import { z } from "zod";
import { BaseUseCaseRequest } from "../../bases/BaseUseCaseRequest";
import { ValidationResult } from "../../bases/ValidationResult";
import { UseCaseError } from "../../bases/UseCaseError";

export class DeleteManyWordsUseCaseRequest extends BaseUseCaseRequest {
  private readonly wordIds: any;
  private readonly userId: any;

  private constructor(wordIds: any, userId: any) {
    super();
    this.wordIds = wordIds;
    this.userId = userId;
  }

  static create({ wordIds, userId }: { wordIds: any; userId: any }) {
    return new DeleteManyWordsUseCaseRequest(wordIds, userId);
  }

  validate(): ValidationResult {
    const validationResult = new ValidationResult();
    const validation = z.object({
      wordIds: z
        .array(z.number().int().positive("Word ID must be a positive integer"))
        .min(1, "At least one word ID must be provided")
        .max(100, "Cannot delete more than 100 words at once"),
      userId: z.number().int().positive("User ID must be a positive integer"),
    });
    const result = validation.safeParse({
      wordIds: this.wordIds,
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

  getWordIds(): number[] {
    return this.wordIds;
  }

  getUserId(): number {
    return this.userId;
  }
}
