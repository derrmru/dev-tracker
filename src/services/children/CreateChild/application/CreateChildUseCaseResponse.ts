export class CreateChildUseCaseResponse {
  private readonly childId: string;

  constructor(childId: string) {
    this.childId = childId;
  }

  static create({ childId }: { childId: string }): CreateChildUseCaseResponse {
    return new CreateChildUseCaseResponse(childId);
  }

  getChildId(): string {
    return this.childId;
  }
}
