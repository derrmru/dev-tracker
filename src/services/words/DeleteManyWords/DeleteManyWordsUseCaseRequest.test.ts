import { DeleteManyWordsUseCaseRequest } from "./DeleteManyWordsUseCaseRequest";

describe("DeleteManyWordsUseCaseRequest", () => {
  it("should create a valid request with valid word IDs", () => {
    const request = DeleteManyWordsUseCaseRequest.create({
      wordIds: [1, 2, 3],
      userId: 1,
    });
    const validationResult = request.validate();
    expect(request.getWordIds()).toEqual([1, 2, 3]);
    expect(request.getUserId()).toBe(1);
    expect(validationResult.isValid()).toBe(true);
  });

  it("should pass validation with a single word ID", () => {
    const request = DeleteManyWordsUseCaseRequest.create({
      wordIds: [42],
      userId: 1,
    });
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(true);
  });

  it("should fail validation with an empty array", () => {
    const request = DeleteManyWordsUseCaseRequest.create({
      wordIds: [],
      userId: 1,
    });
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });

  it("should fail validation with negative word IDs", () => {
    const request = DeleteManyWordsUseCaseRequest.create({
      wordIds: [1, -2, 3],
      userId: 1,
    });
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });

  it("should fail validation with zero as word ID", () => {
    const request = DeleteManyWordsUseCaseRequest.create({
      wordIds: [1, 0, 3],
      userId: 1,
    });
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });

  it("should fail validation with non-integer word IDs", () => {
    const request = DeleteManyWordsUseCaseRequest.create({
      wordIds: [1, 2.5, 3],
      userId: 1,
    });
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });

  it("should fail validation with more than 100 word IDs", () => {
    const manyWordIds = Array.from({ length: 101 }, (_, i) => i + 1);
    const request = DeleteManyWordsUseCaseRequest.create({
      wordIds: manyWordIds,
      userId: 1,
    });
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });

  it("should pass validation with exactly 100 word IDs", () => {
    const exactlyHundredWordIds = Array.from({ length: 100 }, (_, i) => i + 1);
    const request = DeleteManyWordsUseCaseRequest.create({
      wordIds: exactlyHundredWordIds,
      userId: 1,
    });
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(true);
  });

  it("should pass validation with duplicate word IDs", () => {
    const request = DeleteManyWordsUseCaseRequest.create({
      wordIds: [1, 2, 2, 3, 3, 3],
      userId: 1,
    });
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(true);
  });

  it("should fail validation with mixed invalid and valid word IDs", () => {
    const request = DeleteManyWordsUseCaseRequest.create({
      wordIds: [1, -2, 3.5, 0, 5],
      userId: 1,
    });
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });
});
