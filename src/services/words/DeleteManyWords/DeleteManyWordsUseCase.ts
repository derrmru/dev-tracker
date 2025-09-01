import { BaseUseCase } from "../../bases/BaseUseCase";
import { Word } from "../../shared/domain/Word";
import { SqlChildRepository } from "../../shared/infrastructure/SqlChildRepository";
import { SqlWordsRepository } from "../../shared/infrastructure/SqlWordsRepository";
import { DeleteManyWordsUseCaseRequest } from "./DeleteManyWordsUseCaseRequest";
import { DeleteManyWordsUseCaseResponse } from "./DeleteManyWordsUseCaseResponse";

export class DeleteManyWordsUseCase extends BaseUseCase<
  DeleteManyWordsUseCaseRequest,
  DeleteManyWordsUseCaseResponse
> {
  constructor(
    private wordRepository: SqlWordsRepository,
    private childRepository: SqlChildRepository
  ) {
    super();
  }

  async execute(
    request: DeleteManyWordsUseCaseRequest
  ): Promise<DeleteManyWordsUseCaseResponse> {
    const wordsByUserId = await this.wordRepository.findManyByUserId(
      request.getUserId()
    );

    const wordIdsToDelete = wordsByUserId
      .filter((word: Word) => request.getWordIds().includes(word.getId()))
      .map((word: Word) => word.getId());

    const { deletedCount, deletedWordIds } =
      await this.wordRepository.deleteMany(wordIdsToDelete);

    console.log(
      `Successfully deleted ${deletedCount} words with IDs: ${deletedWordIds.join(
        ", "
      )}`
    );

    return DeleteManyWordsUseCaseResponse.create({
      deletedCount,
      deletedWordIds,
    });
  }
}
