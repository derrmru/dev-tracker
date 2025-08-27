import { BaseUseCase } from "../../bases/BaseUseCase";
import { SqlWordsRepository } from "../../shared/infrastructure/SqlWordsRepository";
import { DeleteManyWordsUseCaseRequest } from "./DeleteManyWordsUseCaseRequest";
import { DeleteManyWordsUseCaseResponse } from "./DeleteManyWordsUseCaseResponse";

export class DeleteManyWordsUseCase extends BaseUseCase<
  DeleteManyWordsUseCaseRequest,
  DeleteManyWordsUseCaseResponse
> {
  constructor(private wordRepository: SqlWordsRepository) {
    super();
  }

  async execute(
    request: DeleteManyWordsUseCaseRequest
  ): Promise<DeleteManyWordsUseCaseResponse> {
    request.validate();

    const { deletedCount, deletedWordIds } =
      await this.wordRepository.deleteMany(request.getWordIds());

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
