import { BaseUseCase } from "../../../bases/BaseUseCase";
import { SqlChildRepository } from "../../../shared/infrastructure/SqlChildRepository";
import { SqlHeightRepository } from "../../infrastructure/SqlHeightRepository";
import { FindAllHeightsByChildIdUseCaseRequest } from "./FindAllHeightsByChildIdUseCaseRequest";
import { FindAllHeightsByChildIdUseCaseResponse } from "./FindAllHeightsByChildIdUseCaseResponse";

export class FindAllHeightsByChildIdUseCase extends BaseUseCase<
  FindAllHeightsByChildIdUseCaseRequest,
  FindAllHeightsByChildIdUseCaseResponse
> {
  constructor(
    private heightRepository: SqlHeightRepository,
    private childRepository: SqlChildRepository
  ) {
    super();
  }

  async execute(
    request: FindAllHeightsByChildIdUseCaseRequest
  ): Promise<FindAllHeightsByChildIdUseCaseResponse> {
    const doesChildExistForCurrentUser = await this.childRepository.findById(
      request.getChildId(),
      request.getUserId()
    );

    if (!doesChildExistForCurrentUser) {
      throw new Error("Child does not exist for the current user");
    }

    const heights = await this.heightRepository.findByChildId(
      request.getChildId()
    );

    console.log(
      `Found ${heights.length} heights for child ID ${request.getChildId()}.`
    );

    return FindAllHeightsByChildIdUseCaseResponse.create({ heights });
  }
}
