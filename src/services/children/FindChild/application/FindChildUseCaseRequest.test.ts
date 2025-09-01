import { FindChildUseCaseRequest } from "./FindChildUseCaseRequest";

describe("FindChildUseCaseRequest", () => {
  it("should create a valid request with a positive integer childId", () => {
    const request = FindChildUseCaseRequest.create(1, 1);
    expect(request.getChildId()).toBe(1);
    expect(request.validate().isValid()).toBe(true);
  });
  it("should fail validation with a negative childId", () => {
    const request = FindChildUseCaseRequest.create(-1, 1);
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });
  it("should fail validation with a zero childId", () => {
    const request = FindChildUseCaseRequest.create(0, 1);
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });
  it("should fail validation with a non-integer childId", () => {
    const request = FindChildUseCaseRequest.create(1.5, 1);
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });
  it("should fail validation with a negative userId", () => {
    const request = FindChildUseCaseRequest.create(1, -1);
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });
  it("should fail validation with a zero userId", () => {
    const request = FindChildUseCaseRequest.create(1, 0);
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });
  it("should fail validation with a non-integer userId", () => {
    const request = FindChildUseCaseRequest.create(1, 1.5);
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });
});
