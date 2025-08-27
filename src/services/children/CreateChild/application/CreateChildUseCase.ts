import { BaseUseCase } from "../../../bases/BaseUseCase";
import { Child } from "../../../shared/domain/Child";
import { SqlChildRepository } from "../../../shared/infrastructure/SqlChildRepository";
import { CreateChildUseCaseRequest } from "./CreateChildUseCaseRequest";
import { CreateChildUseCaseResponse } from "./CreateChildUseCaseResponse";

export class CreateChildUseCase extends BaseUseCase<
  CreateChildUseCaseRequest,
  CreateChildUseCaseResponse
> {
  constructor(private readonly childRepository: SqlChildRepository) {
    super();
  }

  async execute(
    request: CreateChildUseCaseRequest
  ): Promise<CreateChildUseCaseResponse> {
    const newChild = await this.childRepository.create(
      Child.create({
        dateOfBirth: request.getDateOfBirth(),
        name: request.getName(),
      })
    );
    if (!newChild) {
      throw new Error("Failed to create child");
    }
    return CreateChildUseCaseResponse.create({
      childId: newChild.getId()?.toString() ?? "",
    });
  }
}
