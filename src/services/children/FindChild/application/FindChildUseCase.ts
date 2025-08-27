import { BaseUseCase } from "../../../bases/BaseUseCase";
import { SqlChildRepository } from "../../../shared/infrastructure/SqlChildRepository";
import { FindChildUseCaseRequest } from "./FindChildUseCaseRequest";
import { FindChildUseCaseResponse } from "./FindChildUseCaseResponse";

export class FindChildUseCase extends BaseUseCase<
  FindChildUseCaseRequest,
  FindChildUseCaseResponse
> {
  constructor(private readonly childRepository: SqlChildRepository) {
    super();
  }
  async execute(
    request: FindChildUseCaseRequest
  ): Promise<FindChildUseCaseResponse> {
    const child = await this.childRepository.findById(request.getChildId());
    return FindChildUseCaseResponse.create(child);
  }
}
