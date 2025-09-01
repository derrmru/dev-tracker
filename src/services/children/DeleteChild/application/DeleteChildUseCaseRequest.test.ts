import { DeleteChildUseCaseRequest } from "./DeleteChildUseCaseRequest";

describe("DeleteChildUseCaseRequest", () => {
  it("should create a valid request with a valid childId", () => {
    const request = DeleteChildUseCaseRequest.create(1, 1);
    expect(request.getChildId()).toBe(1);
    expect(request.validate().isValid()).toBe(true);
  });
  it("should fail validation with a negative childId", () => {
    const request = DeleteChildUseCaseRequest.create(-1, 1);
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });
  it("should fail validation with a non-integer childId", () => {
    const request = DeleteChildUseCaseRequest.create(1.5, 1);
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });
  it("should fail validation with a negative userId", () => {
    const request = DeleteChildUseCaseRequest.create(1, -1);
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });
  it("should fail validation with a non-integer userId", () => {
    const request = DeleteChildUseCaseRequest.create(1, 1.5);
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });
});
