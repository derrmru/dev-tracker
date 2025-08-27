import { Word } from "../../shared/domain/Word";

export class CreateWordUseCaseResponse {
  private readonly savedWord: Word;

  constructor(savedWord: Word) {
    this.savedWord = savedWord;
  }

  getSavedWord(): Word {
    return this.savedWord;
  }
}
