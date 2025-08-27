import { BaseUseCase } from "../../bases/BaseUseCase";
import { SqlWordsRepository } from "../../shared/infrastructure/SqlWordsRepository";
import { FindAllWordsByChildIdUseCaseRequest } from "./FindAllWordsByChildIdUseCaseRequest";
import { FindAllWordsByChildIdUseCaseResponse } from "./FindAllWordsByChildIdUseCaseResponse";

export class FindAllWordsByChildIdUseCase extends BaseUseCase<
  FindAllWordsByChildIdUseCaseRequest,
  FindAllWordsByChildIdUseCaseResponse
> {
  constructor(private wordRepository: SqlWordsRepository) {
    super();
  }

  async execute(
    request: FindAllWordsByChildIdUseCaseRequest
  ): Promise<FindAllWordsByChildIdUseCaseResponse> {
    const words = await this.wordRepository.findByChildId(request.getChildId());

    console.log(
      `Found ${words.length} words for child ID ${request.getChildId()}.`
    );

    return FindAllWordsByChildIdUseCaseResponse.create({ words });
  }
}
