import { BaseUseCase } from "../../bases/BaseUseCase";
import { SqlUserRepository } from "../../shared/infrastructure/SqlUserRepository";
import { FindUserUseCaseRequest } from "./FindUserUseCaseRequest";
import { FindUserUseCaseResponse } from "./FindUserUseCaseResponse";

export class FindUserUseCase extends BaseUseCase<
  FindUserUseCaseRequest,
  FindUserUseCaseResponse
> {
  constructor(private readonly userRepository: SqlUserRepository) {
    super();
  }
  async execute(
    request: FindUserUseCaseRequest
  ): Promise<FindUserUseCaseResponse> {
    const user = await this.userRepository.findById(request.getUserId());
    return FindUserUseCaseResponse.create(user);
  }
}
