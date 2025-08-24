export class Word {
  private readonly word: string;
  private readonly addedAt: Date;

  constructor(word: string, addedAt: Date) {
    this.word = word;
    this.addedAt = addedAt;
  }

  static create({ word, addedAt }: { word: string; addedAt: Date }): Word {
    return new Word(word, addedAt);
  }

  getWord(): string {
    return this.word;
  }

  getAddedAt(): Date {
    return this.addedAt;
  }
}
