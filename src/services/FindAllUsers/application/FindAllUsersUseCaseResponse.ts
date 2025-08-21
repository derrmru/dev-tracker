import { User } from "../../shared/domain/User";

export class FindAllUsersUseCaseResponse {
  private users: User[];

  private constructor(users: User[]) {
    this.users = users;
  }

  static create(users: User[]): FindAllUsersUseCaseResponse {
    return new FindAllUsersUseCaseResponse(users);
  }

  getUsers(): User[] {
    return this.users;
  }
}
