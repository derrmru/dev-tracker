import { User } from "../domain/User";
import { SqlUserRepository } from "../infrastructure/SqlUserRepository";

export class CreateUserUseCase {
  constructor(private readonly userRepository: SqlUserRepository) {}

  async execute(userData: { email: string; name: string }): Promise<User> {
    const newUser = this.userRepository.create(User.create({ ...userData }));
    return await newUser;
  }
}
