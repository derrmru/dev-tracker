import { CreateUserUseCaseRequest } from "./CreateUserUseCaseRequest";

describe("CreateUserUseCaseRequest", () => {
  it("should create a valid request with a valid username and email", () => {
    const request = new CreateUserUseCaseRequest(
      "testuser",
      "something@something.com"
    );
    expect(request.getUsername()).toBe("testuser");
    expect(request.getEmail()).toBe("something@something.com");
    expect(request.validate().isValid()).toBe(true);
  });
  it("should fail validation with a username shorter than 3 characters", () => {
    const request = new CreateUserUseCaseRequest(
      "ab",
      "something@something.com"
    );
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });
  it("should fail validation with an invalid email format", () => {
    const request = new CreateUserUseCaseRequest("testuser", "invalid-email");
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });
});
