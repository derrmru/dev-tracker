export class User {
  private readonly id: number;
  private readonly externalId: string;

  private constructor(id: number, externalId: string) {
    this.id = id;
    this.externalId = externalId;
  }

  static create({ id, externalId }: { id: number; externalId: string }) {
    return new User(id, externalId);
  }

  public getId(): number {
    return this.id;
  }

  public getExternalId(): string {
    return this.externalId;
  }
}
