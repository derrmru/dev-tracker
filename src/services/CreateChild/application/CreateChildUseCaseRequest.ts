import { z } from "zod/v4";
import { BaseUseCaseRequest } from "../../bases/BaseUseCaseRequest";
import { ValidationResult } from "../../bases/ValidationResult";
import { UseCaseError } from "../../bases/UseCaseError";
import { Word } from "../../shared/domain/Word";

export class CreateChildUseCaseRequest extends BaseUseCaseRequest {
  constructor(
    private readonly name: string,
    private readonly dateOfBirth: Date,
    private readonly words?: { word: string; addedAt: Date }[]
  ) {
    super();
    this.name = name;
    this.dateOfBirth = dateOfBirth;
    this.words = words;
  }

  validate(): ValidationResult {
    const validationResult = new ValidationResult();
    const result = z
      .object({
        name: z.string().min(3, "Name must be at least 3 characters long"),
        dateOfBirth: z.date().min(new Date(0), "Invalid date"),
        words: z
          .array(
            z.object({
              word: z.string().min(2).max(100),
              addedAt: z.date().min(new Date(0), "Invalid date"),
            })
          )
          .optional(),
      })
      .safeParse({
        name: this.name,
        dateOfBirth: this.dateOfBirth,
        words: this.words,
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

  getWords(): Word[] {
    return (
      this.words?.map((w) =>
        Word.create({ word: w.word, addedAt: w.addedAt })
      ) ?? []
    );
  }
}
