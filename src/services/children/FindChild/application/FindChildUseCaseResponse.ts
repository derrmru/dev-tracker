import { Nullable } from "../../../../common/utils";
import { Child } from "../../../shared/domain/Child";

export class FindChildUseCaseResponse {
  private child: Nullable<Child>;

  private constructor(child: Nullable<Child>) {
    this.child = child;
  }

  static create(child: Nullable<Child>): FindChildUseCaseResponse {
    return new FindChildUseCaseResponse(child);
  }

  getChild(): Nullable<Child> {
    return this.child;
  }
}
