import { BaseUseCase } from "../../../bases/BaseUseCase";
import { CreateHeightUseCaseRequest } from "./CreateHeightUseCaseRequest";
import { CreateHeightUseCaseResponse } from "./CreateHeightUseCaseResponse";
import { SqlHeightRepository } from "../../infrastructure/SqlHeightRepository";
import { SqlChildRepository } from "../../../shared/infrastructure/SqlChildRepository";

export class CreateHeightUseCase extends BaseUseCase<
  CreateHeightUseCaseRequest,
  CreateHeightUseCaseResponse
> {
  constructor(
    private heightRepository: SqlHeightRepository,
    private childRepository: SqlChildRepository
  ) {
    super();
  }

  async execute(
    request: CreateHeightUseCaseRequest
  ): Promise<CreateHeightUseCaseResponse> {
    console.log("CreateHeightUseCase.execute");

    // Check if child exists and belongs to user
    const child = await this.childRepository.findById(
      request.getChildId(),
      request.getUserId()
    );

    if (!child) {
      throw new Error(
        "Child not found or you don't have permission to add height for this child"
      );
    }

    // Create height
    const height = await this.heightRepository.create({
      height: request.getHeight(),
      childId: request.getChildId(),
      addedAt: request.getAddedAt(),
      unit: request.getUnit(),
    });

    console.log("Height created successfully:", height);
    return new CreateHeightUseCaseResponse(height);
  }
}
