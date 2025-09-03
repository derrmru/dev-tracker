import { Height } from "../../domain/Height";

export class FindAllHeightsByChildIdUseCaseResponse {
  private readonly heights: Height[];

  constructor(heights: Height[]) {
    this.heights = heights;
  }

  static create({
    heights,
  }: {
    heights: Height[];
  }): FindAllHeightsByChildIdUseCaseResponse {
    return new FindAllHeightsByChildIdUseCaseResponse(heights);
  }

  getHeights(): Height[] {
    return this.heights;
  }
}
