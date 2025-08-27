import { BaseUseCase } from "../../../bases/BaseUseCase";
import { SqlChildRepository } from "../../../shared/infrastructure/SqlChildRepository";
import { DeleteChildUseCaseRequest } from "./DeleteChildUseCaseRequest";
import { DeleteChildUseCaseResponse } from "./DeleteChildUseCaseResponse";

export class DeleteChildUseCase extends BaseUseCase<
  DeleteChildUseCaseRequest,
  DeleteChildUseCaseResponse
> {
  constructor(private readonly childRepository: SqlChildRepository) {
    super();
  }

  async execute(
    request: DeleteChildUseCaseRequest
  ): Promise<DeleteChildUseCaseResponse> {
    const childId = request.getChildId();

    await this.childRepository.delete(childId);

    return new DeleteChildUseCaseResponse(true);
  }
}
