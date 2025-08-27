import { BaseUseCase } from "../../bases/BaseUseCase";
import { SqlWordsRepository } from "../../shared/infrastructure/SqlWordsRepository";
import { CreateWordUseCaseRequest } from "./CreateWordUseCaseRequest";
import { CreateWordUseCaseResponse } from "./CreateWordUseCaseResponse";

export class CreateWordUseCase extends BaseUseCase<
  CreateWordUseCaseRequest,
  CreateWordUseCaseResponse
> {
  constructor(private wordRepository: SqlWordsRepository) {
    super();
  }

  async execute(
    request: CreateWordUseCaseRequest
  ): Promise<CreateWordUseCaseResponse> {
    const savedWord = await this.wordRepository.create({
      word: request.getWord(),
      childId: request.getChildId(),
    });

    console.log(`Word "${savedWord}" has been created.`);

    return new CreateWordUseCaseResponse(savedWord);
  }
}
