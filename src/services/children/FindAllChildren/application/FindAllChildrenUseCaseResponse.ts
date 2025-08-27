import { Child } from "../../../shared/domain/Child";

export class FindAllChildrenUseCaseResponse {
  private children: Child[];

  private constructor(children: Child[]) {
    this.children = children;
  }

  static create(children: Child[]): FindAllChildrenUseCaseResponse {
    return new FindAllChildrenUseCaseResponse(children);
  }

  getChildren(): Child[] {
    return this.children;
  }
}
