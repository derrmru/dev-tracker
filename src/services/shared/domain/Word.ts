import { Nullable } from "../../../common/utils";

export class Word {
  private readonly id: number;
  private readonly word: string;
  private readonly addedAt: Date;
  private readonly lastUpdate?: Nullable<Date>;

  constructor(
    id: number,
    word: string,
    addedAt: Date,
    lastUpdate: Nullable<Date> = null
  ) {
    this.id = id;
    this.word = word;
    this.addedAt = addedAt;
    this.lastUpdate = lastUpdate;
  }

  static create({
    id,
    word,
    addedAt,
    lastUpdate = null,
  }: {
    id: number;
    word: string;
    addedAt: Date;
    lastUpdate?: Nullable<Date>;
  }): Word {
    return new Word(id, word, addedAt, lastUpdate);
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

  getLastUpdate(): Nullable<Date> {
    return this.lastUpdate;
  }
}
