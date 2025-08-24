import { CreateChildUseCaseRequest } from "./CreateChildUseCaseRequest";

describe("CreateChildUseCaseRequest", () => {
  it("should create a valid request with a valid name, date of birth, and words", () => {
    const request = new CreateChildUseCaseRequest(
      "testChild",
      new Date("2020-01-01")
    );
    const validationResult = request.validate();
    expect(request.getName()).toBe("testChild");
    expect(request.getDateOfBirth()).toStrictEqual(new Date("2020-01-01"));
    expect(request.getWords()).toEqual([]);
    expect(validationResult.isValid()).toBe(true);
  });
  it("should fail validation with a name shorter than 3 characters", () => {
    const request = new CreateChildUseCaseRequest(
      "ab",
      new Date("2020-01-01"),
      [
        { word: "word1", addedAt: new Date("2020-01-01") },
        { word: "word2", addedAt: new Date("2020-01-02") },
      ]
    );
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });
  it("should fail validation with an invalid date format", () => {
    const request = new CreateChildUseCaseRequest(
      "testChild",
      new Date("invalid-date"),
      [
        { word: "word1", addedAt: new Date("2020-01-01") },
        { word: "word2", addedAt: new Date("2020-01-02") },
      ]
    );
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });
  it("should fail validation with a word shorter than 2 characters", () => {
    const request = new CreateChildUseCaseRequest(
      "testChild",
      new Date("2020-01-01"),
      [
        { word: "w", addedAt: new Date("2020-01-01") },
        { word: "word2", addedAt: new Date("2020-01-02") },
      ]
    );
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });
});
