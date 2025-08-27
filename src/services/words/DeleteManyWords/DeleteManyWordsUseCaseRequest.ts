import { z } from "zod";
import { BaseUseCaseRequest } from "../../bases/BaseUseCaseRequest";
import { ValidationResult } from "../../bases/ValidationResult";
import { UseCaseError } from "../../bases/UseCaseError";

export class DeleteManyWordsUseCaseRequest extends BaseUseCaseRequest {
  private readonly wordIds: number[];

  private constructor(wordIds: number[]) {
    super();
    this.wordIds = wordIds;
  }

  static create({ wordIds }: { wordIds: number[] }) {
    return new DeleteManyWordsUseCaseRequest(wordIds);
  }

  validate(): ValidationResult {
    const validationResult = new ValidationResult();
    const validation = z.object({
      wordIds: z
        .array(z.number().int().positive("Word ID must be a positive integer"))
        .min(1, "At least one word ID must be provided")
        .max(100, "Cannot delete more than 100 words at once"),
    });
    const result = validation.safeParse({
      wordIds: this.wordIds,
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
}
