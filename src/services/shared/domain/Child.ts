import { Word } from "./Word";

export class Child {
  constructor(
    private dateOfBirth: Date,
    private name: string,
    private words: Word[],
    private id?: number
  ) {}

  static create({
    dateOfBirth,
    name,
    words,
    id,
  }: {
    dateOfBirth: Date;
    name: string;
    words: Word[];
    id?: number;
  }): Child {
    return new Child(dateOfBirth, name, words, id);
  }

  getId(): number | undefined {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getDateOfBirth(): Date {
    return this.dateOfBirth;
  }

  getWords(): Word[] {
    return this.words;
  }
}
