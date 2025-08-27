export class DeleteChildUseCaseResponse {
  private readonly success: boolean;

  constructor(success: boolean) {
    this.success = success;
  }

  isSuccess(): boolean {
    return this.success;
  }
}
