import { Prisma } from "@prisma/client";
import { Height } from "../domain/Height";

export class SqlHeightRepository {
  constructor(private readonly db: any) {}

  async create(height: {
    height: number;
    childId: number;
    addedAt: Date;
    unit: string;
  }) {
    console.log("Creating height:", height);
    try {
      const result = await this.db.$transaction(
        async (tx: Prisma.TransactionClient) => {
          return await tx.height.create({
            data: height,
          });
        }
      );
      console.log("Created height:", result);
      return new Height(
        result.id,
        result.childId,
        result.addedAt,
        result.height,
        result.unit
      );
    } catch (error) {
      console.error("Error creating height:", error);
      throw error;
    }
  }

  async findByChildId(childId: number): Promise<Height[]> {
    console.log("Finding heights for childId:", childId);
    try {
      const result = await this.db.$transaction(
        async (tx: Prisma.TransactionClient) => {
          return await tx.height.findMany({
            where: { childId },
            orderBy: { addedAt: "desc" },
          });
        }
      );
      console.log("Found heights:", result);
      return result.map(
        (height: any) =>
          new Height(
            height.id,
            height.childId,
            height.addedAt,
            height.height,
            height.unit
          )
      );
    } catch (error) {
      console.error("Error finding heights:", error);
      throw error;
    }
  }
}
