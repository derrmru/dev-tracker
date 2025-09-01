import { BaseUseCase } from "../../../bases/BaseUseCase";
import { SqlChildRepository } from "../../../shared/infrastructure/SqlChildRepository";
import { UpdateChildUseCaseRequest } from "./UpdateChildUseCaseRequest";
import { UpdateChildUseCaseResponse } from "./UpdateChildUseCaseResponse";

export class UpdateChildUseCase extends BaseUseCase<
  UpdateChildUseCaseRequest,
  UpdateChildUseCaseResponse
> {
  constructor(private readonly childRepository: SqlChildRepository) {
    super();
  }

  async execute(
    request: UpdateChildUseCaseRequest
  ): Promise<UpdateChildUseCaseResponse> {
    console.log("Request to update child:", request);
    const child = await this.childRepository.findById(
      request.getChildId(),
      request.getUserId()
    );
    console.log("Existing Child Data:", child);
    if (!child) {
      throw new Error("Child not found");
    }

    const newChild = child
      .setName(request.getName() ?? child.getName())
      .setDateOfBirth(request.getDateOfBirth() ?? child.getDateOfBirth());

    console.log("New Child Data:", newChild);

    const savedChild = await this.childRepository.update(newChild);

    return UpdateChildUseCaseResponse.create(savedChild);
  }
}
