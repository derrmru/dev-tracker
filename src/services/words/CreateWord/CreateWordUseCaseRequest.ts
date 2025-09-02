import { z } from "zod";
import { BaseUseCaseRequest } from "../../bases/BaseUseCaseRequest";
import { ValidationResult } from "../../bases/ValidationResult";
import { UseCaseError } from "../../bases/UseCaseError";

export class CreateWordUseCaseRequest extends BaseUseCaseRequest {
  private readonly word: string;
  private readonly childId: number;
  private readonly userId: number;
  private readonly addedAt: Date;

  private constructor(
    word: string,
    childId: number,
    userId: number,
    addedAt: Date
  ) {
    super();
    this.word = word;
    this.childId = childId;
    this.addedAt = addedAt;
    this.userId = userId;
  }

  static create({
    word,
    childId,
    userId,
    addedAt,
  }: {
    word: string;
    childId: number;
    userId: number;
    addedAt: Date;
  }) {
    return new CreateWordUseCaseRequest(word, childId, userId, addedAt);
  }

  validate(): ValidationResult {
    const validationResult = new ValidationResult();
    const validation = z.object({
      word: z.string().min(1).max(100),
      childId: z.number().int().min(1),
      userId: z.number().int().min(1),
      addedAt: z.date(),
    });
    const result = validation.safeParse({
      word: this.word,
      childId: this.childId,
      userId: this.userId,
      addedAt: this.addedAt,
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

  getUserId(): number {
    return this.userId;
  }

  getAddedAt(): Date {
    return this.addedAt;
  }
}
