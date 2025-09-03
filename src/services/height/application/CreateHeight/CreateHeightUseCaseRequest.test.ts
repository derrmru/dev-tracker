import { CreateHeightUseCaseRequest } from "./CreateHeightUseCaseRequest";

describe("CreateHeightUseCaseRequest", () => {
  describe("create", () => {
    it("should create a valid request with required fields", () => {
      const request = CreateHeightUseCaseRequest.create({
        height: 120.5,
        childId: 1,
        userId: 1,
      });

      expect(request.getHeight()).toBe(120.5);
      expect(request.getChildId()).toBe(1);
      expect(request.getUserId()).toBe(1);
      expect(request.getUnit()).toBe("cm");
      expect(request.getAddedAt()).toBeInstanceOf(Date);
    });

    it("should create a valid request with all fields", () => {
      const measuredAt = new Date("2023-01-01");
      const request = CreateHeightUseCaseRequest.create({
        height: 4.2,
        childId: 2,
        userId: 2,
        addedAt: measuredAt,
        unit: "ft",
      });

      expect(request.getHeight()).toBe(4.2);
      expect(request.getChildId()).toBe(2);
      expect(request.getUserId()).toBe(2);
      expect(request.getUnit()).toBe("ft");
      expect(request.getAddedAt()).toStrictEqual(measuredAt);
    });

    it("should throw error for invalid height", () => {
      expect(() => {
        CreateHeightUseCaseRequest.create({
          height: -5,
          childId: 1,
          userId: 1,
        });
      }).toThrow("Validation failed");
    });

    it("should throw error for invalid childId", () => {
      expect(() => {
        CreateHeightUseCaseRequest.create({
          height: 120,
          childId: -1,
          userId: 1,
        });
      }).toThrow("Validation failed");
    });

    it("should throw error for invalid userId", () => {
      expect(() => {
        CreateHeightUseCaseRequest.create({
          height: 120,
          childId: 1,
          userId: -1,
        });
      }).toThrow("Validation failed");
    });

    it("should use default unit if not provided", () => {
      const request = CreateHeightUseCaseRequest.create({
        height: 120,
        childId: 1,
        userId: 1,
      });

      expect(request.getUnit()).toBe("cm");
    });
  });

  describe("validate", () => {
    it("should return valid result for valid request", () => {
      const request = CreateHeightUseCaseRequest.create({
        height: 120,
        childId: 1,
        userId: 1,
      });

      const validation = request.validate();
      expect(validation.isValid()).toBe(true);
      expect(validation.getErrors()).toHaveLength(0);
    });
  });
});
