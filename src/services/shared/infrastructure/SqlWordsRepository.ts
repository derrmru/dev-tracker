import { Prisma } from "@prisma/client";
import { Word } from "../domain/Word";

export class SqlWordsRepository {
  constructor(private readonly db: any) {}

  async create(word: { word: string; childId: number }) {
    console.log("Creating word:", word);
    try {
      const result = await this.db.$transaction(
        async (tx: Prisma.TransactionClient) => {
          return await tx.words.create({
            data: word,
          });
        }
      );
      console.log("Created words:", result);
      return Word.create({ word: result.word, addedAt: result.addedAt });
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
          return await tx.words.findMany({
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
