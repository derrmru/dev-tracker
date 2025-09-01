import { BaseUseCase } from "../../bases/BaseUseCase";
import { SqlChildRepository } from "../../shared/infrastructure/SqlChildRepository";
import { SqlWordsRepository } from "../../shared/infrastructure/SqlWordsRepository";
import { UpdateWordByChildIdUseCaseRequest } from "./UpdateWordByChildIdUseCaseRequest";
import { UpdateWordByChildIdUseCaseResponse } from "./UpdateWordByChildIdUseCaseResponse";

export class UpdateWordByChildIdUseCase extends BaseUseCase<
  UpdateWordByChildIdUseCaseRequest,
  UpdateWordByChildIdUseCaseResponse
> {
  constructor(
    private wordRepository: SqlWordsRepository,
    private childRepository: SqlChildRepository
  ) {
    super();
  }

  async execute(
    request: UpdateWordByChildIdUseCaseRequest
  ): Promise<UpdateWordByChildIdUseCaseResponse> {
    const doesChildExistOnCurrentUser = this.childRepository.findById(
      request.getChildId(),
      request.getUserId()
    );

    if (!doesChildExistOnCurrentUser) {
      throw new Error("Child does not belong to the current user");
    }

    const updatedWord = await this.wordRepository.updateByChildId({
      wordId: request.getWordId(),
      word: request.getWord().getWord(),
      addedAt: request.getWord().getAddedAt(),
      childId: request.getChildId(),
    });

    console.log(
      `Word "${updatedWord.getWord()}" has been updated for child ID ${request.getChildId()}.`
    );

    return UpdateWordByChildIdUseCaseResponse.create({ updatedWord });
  }
}
