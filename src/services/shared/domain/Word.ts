import { Nullable } from "../../../common/utils";

export class Word {
  private readonly id: number;
  private readonly word: string;
  private readonly addedAt: Date;
  private readonly childId: number;
  private readonly lastUpdate?: Nullable<Date>;

  constructor(
    id: number,
    word: string,
    addedAt: Date,
    childId: number,
    lastUpdate: Nullable<Date> = null
  ) {
    this.id = id;
    this.word = word;
    this.addedAt = addedAt;
    this.childId = childId;
    this.lastUpdate = lastUpdate;
  }

  static create({
    id,
    word,
    addedAt,
    childId,
    lastUpdate = null,
  }: {
    id: number;
    word: string;
    addedAt: Date;
    childId: number;
    lastUpdate?: Nullable<Date>;
  }): Word {
    return new Word(id, word, addedAt, childId, lastUpdate);
  }

  getId(): number {
    return this.id;
  }

  getWord(): string {
    return this.word;
  }

  getAddedAt(): Date {
    return this.addedAt;
  }

  getChildId(): number {
    return this.childId;
  }

  getLastUpdate(): Nullable<Date> {
    return this.lastUpdate;
  }
}
