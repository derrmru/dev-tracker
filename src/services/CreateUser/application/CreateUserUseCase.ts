import { BaseUseCase } from "../../bases/BaseUseCase";
import { User } from "../../shared/domain/User";
import { SqlUserRepository } from "../../shared/infrastructure/SqlUserRepository";
import { CreateUserUseCaseRequest } from "./CreateUserUseCaseRequest";
import { CreateUserUseCaseResponse } from "./CreateUserUseCaseResponse";

export class CreateUserUseCase extends BaseUseCase<
  CreateUserUseCaseRequest,
  CreateUserUseCaseResponse
> {
  constructor(private readonly userRepository: SqlUserRepository) {
    super();
  }

  async execute(
    request: CreateUserUseCaseRequest
  ): Promise<CreateUserUseCaseResponse> {
    const validationResult = request.validate();
    if (!validationResult.isValid()) {
      throw validationResult;
    }
    const newUser = await this.userRepository.create(
      User.create({
        email: request.getEmail(),
        name: request.getUsername(),
      })
    );
    if (!newUser) {
      throw new Error("Failed to create user");
    }
    return CreateUserUseCaseResponse.create({
      userId: newUser.getId()?.toString() || "",
    });
  }
}
