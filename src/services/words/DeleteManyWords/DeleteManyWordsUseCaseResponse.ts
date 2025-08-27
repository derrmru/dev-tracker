export class DeleteManyWordsUseCaseResponse {
  private readonly deletedCount: number;
  private readonly deletedWordIds: number[];

  constructor(deletedCount: number, deletedWordIds: number[]) {
    this.deletedCount = deletedCount;
    this.deletedWordIds = deletedWordIds;
  }

  static create({
    deletedCount,
    deletedWordIds,
  }: {
    deletedCount: number;
    deletedWordIds: number[];
  }): DeleteManyWordsUseCaseResponse {
    return new DeleteManyWordsUseCaseResponse(deletedCount, deletedWordIds);
  }

  getDeletedCount(): number {
    return this.deletedCount;
  }

  getDeletedWordIds(): number[] {
    return this.deletedWordIds;
  }
}
