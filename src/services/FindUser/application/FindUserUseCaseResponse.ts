import { Nullable } from "../../../common/utils";
import { User } from "../../shared/domain/User";

export class FindUserUseCaseResponse {
  private user: Nullable<User>;

  private constructor(user: Nullable<User>) {
    this.user = user;
  }

  static create(user: Nullable<User>): FindUserUseCaseResponse {
    return new FindUserUseCaseResponse(user);
  }

  getUser(): Nullable<User> {
    return this.user;
  }
}
