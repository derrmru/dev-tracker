import { Word } from "../../shared/domain/Word";

export class FindAllWordsByChildIdUseCaseResponse {
  private readonly words: Word[];

  constructor(words: Word[]) {
    this.words = words;
  }

  static create({
    words,
  }: {
    words: Word[];
  }): FindAllWordsByChildIdUseCaseResponse {
    return new FindAllWordsByChildIdUseCaseResponse(words);
  }

  getWords(): Word[] {
    return this.words;
  }
}
