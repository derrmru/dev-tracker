import { BaseUseCase } from "../../../bases/BaseUseCase";
import { SqlChildRepository } from "../../../shared/infrastructure/SqlChildRepository";
import { FindAllChildrenUseCaseRequest } from "./FindAllChildrenUseCaseRequest";
import { FindAllChildrenUseCaseResponse } from "./FindAllChildrenUseCaseResponse";

export class FindAllChildrenUseCase extends BaseUseCase<
  FindAllChildrenUseCaseRequest,
  FindAllChildrenUseCaseResponse
> {
  constructor(private readonly childRepository: SqlChildRepository) {
    super();
  }

  async execute(
    request: FindAllChildrenUseCaseRequest
  ): Promise<FindAllChildrenUseCaseResponse> {
    const children = await this.childRepository.findAllByUserId(
      request.getUserId()
    );
    return FindAllChildrenUseCaseResponse.create(children);
  }
}
