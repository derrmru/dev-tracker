import { Prisma } from "@prisma/client";

export class SqlWordsRepository {
  constructor(private readonly db: any) {}

  async createMany(words: { word: string; addedAt: Date; childId: number }[]) {
    console.log("Creating words:", words);
    try {
      const result = await this.db.$transaction(
        async (tx: Prisma.TransactionClient) => {
          return await tx.word.createMany({
            data: words,
          });
        }
      );
      console.log("Created words:", result);
      return result;
    } catch (error) {
      console.error("Error creating words:", error);
      throw error;
    }
  }

  async findByChildId(childId: number) {
    console.log("Finding words for childId:", childId);
    try {
      const result = await this.db.$transaction(
        async (tx: Prisma.TransactionClient) => {
          return await tx.word.findMany({
            where: { childId },
          });
        }
      );
      console.log("Found words:", result);
      return result;
    } catch (error) {
      console.error("Error finding words:", error);
      throw error;
    }
  }
}
