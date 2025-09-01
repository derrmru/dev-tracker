import { CreateChildUseCaseRequest } from "./CreateChildUseCaseRequest";

describe("CreateChildUseCaseRequest", () => {
  it("should create a valid request with a valid name, date of birth, and words", () => {
    const request = new CreateChildUseCaseRequest(
      "testChild",
      new Date("2020-01-01"),
      1
    );
    const validationResult = request.validate();
    expect(request.getName()).toBe("testChild");
    expect(request.getDateOfBirth()).toStrictEqual(new Date("2020-01-01"));
    expect(request.getUserId()).toBe(1);
    expect(validationResult.isValid()).toBe(true);
  });
  it("should fail validation with a name shorter than 3 characters", () => {
    const request = new CreateChildUseCaseRequest(
      "ab",
      new Date("2020-01-01"),
      1
    );
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });
  it("should fail validation with an invalid date format", () => {
    const request = new CreateChildUseCaseRequest(
      "testChild",
      new Date("invalid-date"),
      1
    );
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });
  it("should fail validation with a user ID less than 1", () => {
    const request = new CreateChildUseCaseRequest(
      "testChild",
      new Date("2020-01-01"),
      0
    );
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });
});
