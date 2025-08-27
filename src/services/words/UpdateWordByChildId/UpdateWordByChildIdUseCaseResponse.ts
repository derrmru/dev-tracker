import { Word } from "../../shared/domain/Word";

export class UpdateWordByChildIdUseCaseResponse {
  private readonly updatedWord: Word;

  constructor(updatedWord: Word) {
    this.updatedWord = updatedWord;
  }

  static create({
    updatedWord,
  }: {
    updatedWord: Word;
  }): UpdateWordByChildIdUseCaseResponse {
    return new UpdateWordByChildIdUseCaseResponse(updatedWord);
  }

  getUpdatedWord(): Word {
    return this.updatedWord;
  }
}
