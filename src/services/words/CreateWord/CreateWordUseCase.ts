import { BaseUseCase } from "../../bases/BaseUseCase";
import { SqlChildRepository } from "../../shared/infrastructure/SqlChildRepository";
import { SqlWordsRepository } from "../../shared/infrastructure/SqlWordsRepository";
import { CreateWordUseCaseRequest } from "./CreateWordUseCaseRequest";
import { CreateWordUseCaseResponse } from "./CreateWordUseCaseResponse";

export class CreateWordUseCase extends BaseUseCase<
  CreateWordUseCaseRequest,
  CreateWordUseCaseResponse
> {
  constructor(
    private wordRepository: SqlWordsRepository,
    private childRepository: SqlChildRepository
  ) {
    super();
  }

  async execute(
    request: CreateWordUseCaseRequest
  ): Promise<CreateWordUseCaseResponse> {
    const doesChildExistForCurrentUser = await this.childRepository.findById(
      request.getChildId(),
      request.getUserId()
    );

    if (!doesChildExistForCurrentUser) {
      throw new Error("Child does not exist for the current user");
    }

    const savedWord = await this.wordRepository.create({
      word: request.getWord(),
      childId: request.getChildId(),
    });

    console.log(`Word "${savedWord}" has been created.`);

    return new CreateWordUseCaseResponse(savedWord);
  }
}
