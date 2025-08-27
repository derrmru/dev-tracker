import { Child } from "../../../shared/domain/Child";

export class UpdateChildUseCaseResponse {
  constructor(private readonly child: Child) {}

  static create(child: Child): UpdateChildUseCaseResponse {
    return new UpdateChildUseCaseResponse(child);
  }

  getChild(): Child {
    return this.child;
  }
}
