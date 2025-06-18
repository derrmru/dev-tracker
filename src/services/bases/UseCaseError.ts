export class UseCaseError {
  private readonly message: string;
  private readonly code: number;

  private constructor(message: string, code: number) {
    this.message = message;
    this.code = code;
  }

  static create({
    message,
    code,
  }: {
    message: string;
    code: number;
  }): UseCaseError {
    return new UseCaseError(message, code);
  }

  getMessage(): string {
    return this.message;
  }

  getCode(): number {
    return this.code;
  }
}
