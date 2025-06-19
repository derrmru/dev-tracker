import { ValidationResult } from "../services/bases/ValidationResult";
import { UseCaseError } from "../services/bases/UseCaseError";
import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ValidationResult) {
    return res.status(422).json({
      message: "Validation failed",
      errors: err.getErrors().map((error: UseCaseError) => ({
        message: error.getMessage(),
        code: error.getCode(),
      })),
    });
  }
  res.status(500).json({
    message: "Internal server error",
    errors: [
      {
        message: "An unexpected error occurred",
        code: "INTERNAL_SERVER_ERROR",
      },
    ],
  });
}
