import { z } from "zod";
import { BaseUseCaseRequest } from "../../../bases/BaseUseCaseRequest";
import { ValidationResult } from "../../../bases/ValidationResult";
import { UseCaseError } from "../../../bases/UseCaseError";
import { Unit } from "../../domain/Height";

const CreateHeightRequestSchema = z.object({
  height: z.number().positive("Height must be a positive number"),
  childId: z.number().int().positive("Child ID must be a positive integer"),
  userId: z.number().int().positive("User ID must be a positive integer"),
  addedAt: z.date(),
  unit: z.enum(["cm", "m", "in", "ft"]).default("cm"),
});

export class CreateHeightUseCaseRequest extends BaseUseCaseRequest {
  private readonly height: number;
  private readonly childId: number;
  private readonly userId: number;
  private readonly addedAt: Date;
  private readonly unit: Unit;

  private constructor(
    height: number,
    childId: number,
    userId: number,
    addedAt: Date,
    unit: Unit
  ) {
    super();
    this.height = height;
    this.childId = childId;
    this.userId = userId;
    this.addedAt = addedAt;
    this.unit = unit;
  }

  static create({
    height,
    childId,
    userId,
    addedAt,
    unit,
  }: {
    height: number;
    childId: number;
    userId: number;
    addedAt?: Date;
    unit?: string;
  }): CreateHeightUseCaseRequest {
    const result = CreateHeightRequestSchema.safeParse({
      height,
      childId,
      userId,
      addedAt: addedAt || new Date(),
      unit: unit || "cm",
    });

    if (!result.success) {
      throw new Error(`Validation failed: ${result.error.message}`);
    }

    return new CreateHeightUseCaseRequest(
      result.data.height,
      result.data.childId,
      result.data.userId,
      result.data.addedAt,
      result.data.unit
    );
  }

  getHeight(): number {
    return this.height;
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

  getUnit(): Unit {
    return this.unit;
  }

  validate(): ValidationResult {
    const validationResult = new ValidationResult();
    const result = CreateHeightRequestSchema.safeParse({
      height: this.height,
      childId: this.childId,
      userId: this.userId,
      addedAt: this.addedAt,
      unit: this.unit,
    });

    if (!result.success) {
      result.error.errors.forEach((error) => {
        validationResult.addError(
          UseCaseError.create({
            message: error.message,
            code: 400,
          })
        );
      });
    }

    return validationResult;
  }
}
