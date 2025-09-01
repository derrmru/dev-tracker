import { z } from "zod";
import { BaseUseCaseRequest } from "../../bases/BaseUseCaseRequest";
import { ValidationResult } from "../../bases/ValidationResult";
import { UseCaseError } from "../../bases/UseCaseError";
import { Word } from "../../shared/domain/Word";

export class UpdateWordByChildIdUseCaseRequest extends BaseUseCaseRequest {
  private readonly wordId: number;
  private readonly word: Word;
  private readonly childId: number;
  private readonly userId: number;

  private constructor(
    wordId: number,
    word: Word,
    childId: number,
    userId: number
  ) {
    super();
    this.wordId = wordId;
    this.word = word;
    this.childId = childId;
    this.userId = userId;
  }

  static create({
    wordId,
    word,
    childId,
    userId,
  }: {
    wordId: number;
    word: Word;
    childId: number;
    userId: number;
  }) {
    return new UpdateWordByChildIdUseCaseRequest(wordId, word, childId, userId);
  }

  validate(): ValidationResult {
    const validationResult = new ValidationResult();
    const validation = z.object({
      wordId: z.number().int().positive("Word ID must be a positive integer"),
      word: z
        .object({
          id: z.number().int().positive("Word ID must be a positive integer"),
          word: z
            .string()
            .min(1, "Word must not be empty")
            .max(100, "Word must not exceed 100 characters"),
          addedAt: z.date(),
          lastUpdate: z.date().nullable(),
        })
        .required(),
      childId: z.number().int().positive("Child ID must be a positive integer"),
      userId: z.number().int().positive("User ID must be a positive integer"),
    });
    const result = validation.safeParse({
      wordId: this.wordId,
      word: this.word,
      childId: this.childId,
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

  getWordId(): number {
    return this.wordId;
  }

  getWord(): Word {
    return this.word;
  }

  getChildId(): number {
    return this.childId;
  }

  getUserId(): number {
    return this.userId;
  }
}
