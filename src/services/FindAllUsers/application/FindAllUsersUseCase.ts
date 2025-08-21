import { BaseUseCase } from "../../bases/BaseUseCase";
import { SqlUserRepository } from "../../shared/infrastructure/SqlUserRepository";
import { FindAllUsersUseCaseRequest } from "./FindAllUsersUseCaseRequest";
import { FindAllUsersUseCaseResponse } from "./FindAllUsersUseCaseResponse";

export class FindAllUsersUseCase extends BaseUseCase<
  FindAllUsersUseCaseRequest,
  FindAllUsersUseCaseResponse
> {
  constructor(private readonly userRepository: SqlUserRepository) {
    super();
  }

  async execute(
    request: FindAllUsersUseCaseRequest
  ): Promise<FindAllUsersUseCaseResponse> {
    const users = await this.userRepository.findAll();
    return FindAllUsersUseCaseResponse.create(users);
  }
}
