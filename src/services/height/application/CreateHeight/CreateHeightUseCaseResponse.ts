import { Height } from "../../domain/Height";

export class CreateHeightUseCaseResponse {
  public readonly height: Height;

  constructor(height: Height) {
    this.height = height;
  }
}
