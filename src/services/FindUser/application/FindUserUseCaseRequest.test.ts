import { FindUserUseCaseRequest } from "./FindUserUseCaseRequest";

describe("FindUserUseCaseRequest", () => {
  it("should create a valid request with a positive integer userId", () => {
    const request = FindUserUseCaseRequest.create(1);
    expect(request.getUserId()).toBe(1);
    expect(request.validate().isValid()).toBe(true);
  });
  it("should fail validation with a negative userId", () => {
    const request = FindUserUseCaseRequest.create(-1);
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });
  it("should fail validation with a zero userId", () => {
    const request = FindUserUseCaseRequest.create(0);
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });
  it("should fail validation with a non-integer userId", () => {
    const request = FindUserUseCaseRequest.create(1.5);
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });
});
