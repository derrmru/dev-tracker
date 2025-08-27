import { UpdateWordByChildIdUseCaseRequest } from "./UpdateWordByChildIdUseCaseRequest";
import { Word } from "../../shared/domain/Word";

describe("UpdateWordByChildIdUseCaseRequest", () => {
  it("should create a valid request with valid parameters", () => {
    const word = Word.create({
      id: 1,
      word: "testword",
      addedAt: new Date("2023-01-01"),
    });
    const request = UpdateWordByChildIdUseCaseRequest.create({
      wordId: 1,
      word: word,
      childId: 123,
    });
    const validationResult = request.validate();
    expect(request.getWordId()).toBe(1);
    expect(request.getWord().getWord()).toBe("testword");
    expect(request.getChildId()).toBe(123);
    expect(validationResult.isValid()).toBe(true);
  });

  it("should fail validation with a negative word ID", () => {
    const word = Word.create({
      id: 1,
      word: "testword",
      addedAt: new Date("2023-01-01"),
    });
    const request = UpdateWordByChildIdUseCaseRequest.create({
      wordId: -1,
      word: word,
      childId: 123,
    });
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });

  it("should fail validation with zero as word ID", () => {
    const word = Word.create({
      id: 1,
      word: "testword",
      addedAt: new Date("2023-01-01"),
    });
    const request = UpdateWordByChildIdUseCaseRequest.create({
      wordId: 0,
      word: word,
      childId: 123,
    });
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });

  it("should fail validation with an empty word text", () => {
    const word = Word.create({
      id: 1,
      word: "",
      addedAt: new Date("2023-01-01"),
    });
    const request = UpdateWordByChildIdUseCaseRequest.create({
      wordId: 1,
      word: word,
      childId: 123,
    });
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });

  it("should fail validation with a word longer than 100 characters", () => {
    const longWordText = "a".repeat(101);
    const word = Word.create({
      id: 1,
      word: longWordText,
      addedAt: new Date("2023-01-01"),
    });
    const request = UpdateWordByChildIdUseCaseRequest.create({
      wordId: 1,
      word: word,
      childId: 123,
    });
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });

  it("should pass validation with a word exactly 100 characters long", () => {
    const maxLengthWordText = "a".repeat(100);
    const word = Word.create({
      id: 1,
      word: maxLengthWordText,
      addedAt: new Date("2023-01-01"),
    });
    const request = UpdateWordByChildIdUseCaseRequest.create({
      wordId: 1,
      word: word,
      childId: 123,
    });
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(true);
  });

  it("should fail validation with a negative child ID", () => {
    const word = Word.create({
      id: 1,
      word: "testword",
      addedAt: new Date("2023-01-01"),
    });
    const request = UpdateWordByChildIdUseCaseRequest.create({
      wordId: 1,
      word: word,
      childId: -1,
    });
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });

  it("should fail validation with zero as child ID", () => {
    const word = Word.create({
      id: 1,
      word: "testword",
      addedAt: new Date("2023-01-01"),
    });
    const request = UpdateWordByChildIdUseCaseRequest.create({
      wordId: 1,
      word: word,
      childId: 0,
    });
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });

  it("should fail validation with non-integer word ID", () => {
    const word = Word.create({
      id: 1,
      word: "testword",
      addedAt: new Date("2023-01-01"),
    });
    const request = UpdateWordByChildIdUseCaseRequest.create({
      wordId: 1.5,
      word: word,
      childId: 123,
    });
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });

  it("should fail validation with non-integer child ID", () => {
    const word = Word.create({
      id: 1,
      word: "testword",
      addedAt: new Date("2023-01-01"),
    });
    const request = UpdateWordByChildIdUseCaseRequest.create({
      wordId: 1,
      word: word,
      childId: 123.5,
    });
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });

  it("should pass validation with minimum valid values", () => {
    const word = Word.create({
      id: 1,
      word: "a",
      addedAt: new Date("2023-01-01"),
    });
    const request = UpdateWordByChildIdUseCaseRequest.create({
      wordId: 1,
      word: word,
      childId: 1,
    });
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(true);
  });

  it("should fail validation with negative word object ID", () => {
    const word = Word.create({
      id: -1,
      word: "testword",
      addedAt: new Date("2023-01-01"),
    });
    const request = UpdateWordByChildIdUseCaseRequest.create({
      wordId: 1,
      word: word,
      childId: 123,
    });
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(0);
  });

  it("should fail validation with multiple invalid parameters", () => {
    const word = Word.create({
      id: -1,
      word: "",
      addedAt: new Date("2023-01-01"),
    });
    const request = UpdateWordByChildIdUseCaseRequest.create({
      wordId: -1,
      word: word,
      childId: -5,
    });
    const validationResult = request.validate();
    expect(validationResult.isValid()).toBe(false);
    expect(validationResult.getErrors().length).toBeGreaterThan(2); // Should have multiple errors
  });
});
