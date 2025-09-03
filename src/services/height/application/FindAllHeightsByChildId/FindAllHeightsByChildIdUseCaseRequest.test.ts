import { FindAllHeightsByChildIdUseCaseRequest } from "./FindAllHeightsByChildIdUseCaseRequest";

describe("FindAllHeightsByChildIdUseCaseRequest", () => {
  describe("create", () => {
    it("should create a valid request", () => {
      const request = FindAllHeightsByChildIdUseCaseRequest.create(1, 1);

      expect(request.getChildId()).toBe(1);
      expect(request.getUserId()).toBe(1);
    });
  });

  describe("validate", () => {
    it("should return valid result for valid request", () => {
      const request = FindAllHeightsByChildIdUseCaseRequest.create(1, 1);
      const validation = request.validate();

      expect(validation.isValid()).toBe(true);
      expect(validation.getErrors()).toHaveLength(0);
    });

    it("should return invalid result for negative childId", () => {
      const request = FindAllHeightsByChildIdUseCaseRequest.create(-1, 1);
      const validation = request.validate();

      expect(validation.isValid()).toBe(false);
      expect(validation.getErrors().length).toBeGreaterThan(0);
    });

    it("should return invalid result for negative userId", () => {
      const request = FindAllHeightsByChildIdUseCaseRequest.create(1, -1);
      const validation = request.validate();

      expect(validation.isValid()).toBe(false);
      expect(validation.getErrors().length).toBeGreaterThan(0);
    });
  });
});
