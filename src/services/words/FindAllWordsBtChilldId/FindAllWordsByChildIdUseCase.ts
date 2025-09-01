import { BaseUseCase } from "../../bases/BaseUseCase";
import { SqlChildRepository } from "../../shared/infrastructure/SqlChildRepository";
import { SqlWordsRepository } from "../../shared/infrastructure/SqlWordsRepository";
import { FindAllWordsByChildIdUseCaseRequest } from "./FindAllWordsByChildIdUseCaseRequest";
import { FindAllWordsByChildIdUseCaseResponse } from "./FindAllWordsByChildIdUseCaseResponse";

export class FindAllWordsByChildIdUseCase extends BaseUseCase<
  FindAllWordsByChildIdUseCaseRequest,
  FindAllWordsByChildIdUseCaseResponse
> {
  constructor(
    private wordRepository: SqlWordsRepository,
    private childRepository: SqlChildRepository
  ) {
    super();
  }

  async execute(
    request: FindAllWordsByChildIdUseCaseRequest
  ): Promise<FindAllWordsByChildIdUseCaseResponse> {
    const doesChildExistForCurrentUser = await this.childRepository.findById(
      request.getChildId(),
      request.getUserId()
    );

    if (!doesChildExistForCurrentUser) {
      throw new Error("Child does not exist for the current user");
    }

    const words = await this.wordRepository.findByChildId(request.getChildId());

    console.log(
      `Found ${words.length} words for child ID ${request.getChildId()}.`
    );

    return FindAllWordsByChildIdUseCaseResponse.create({ words });
  }
}
