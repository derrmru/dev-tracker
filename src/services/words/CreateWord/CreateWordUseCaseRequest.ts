import { z } from "zod";
import { BaseUseCaseRequest } from "../../bases/BaseUseCaseRequest";
import { ValidationResult } from "../../bases/ValidationResult";
import { UseCaseError } from "../../bases/UseCaseError";

export class CreateWordUseCaseRequest extends BaseUseCaseRequest {
  private readonly word: string;
  private readonly childId: number;

  private constructor(word: string, childId: number) {
    super();
    this.word = word;
    this.childId = childId;
  }

  static create({ word, childId }: { word: string; childId: number }) {
    return new CreateWordUseCaseRequest(word, childId);
  }

  validate(): ValidationResult {
    const validationResult = new ValidationResult();
    const validation = z.object({
      word: z.string().min(1).max(100),
      childId: z.number().int().min(1),
    });
    const result = validation.safeParse({
      word: this.word,
      childId: this.childId,
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

  getWord(): string {
    return this.word;
  }

  getChildId(): number {
    return this.childId;
  }
}
