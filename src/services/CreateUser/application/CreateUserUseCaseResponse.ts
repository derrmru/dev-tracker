export class CreateUserUseCaseResponse {
  private readonly userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  static create({ userId }: { userId: string }): CreateUserUseCaseResponse {
    return new CreateUserUseCaseResponse(userId);
  }

  getUserId(): string {
    return this.userId;
  }
}
