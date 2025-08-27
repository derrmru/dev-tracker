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
      return Word.create({
        id: result.id,
        word: result.word,
        addedAt: result.addedAt,
      });
    } catch (error) {
      console.error("Error creating words:", error);
      throw error;
    }
  }

  async findByChildId(childId: number): Promise<Word[]> {
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
      return result.map((word: any) =>
        Word.create({
          id: word.id,
          word: word.word,
          addedAt: word.addedAt,
        })
      );
    } catch (error) {
      console.error("Error finding words:", error);
      throw error;
    }
  }

  async findAll(): Promise<Word[]> {
    console.log("Finding all words");
    try {
      const result = await this.db.$transaction(
        async (tx: Prisma.TransactionClient) => {
          return await tx.words.findMany();
        }
      );
      console.log("Found words:", result);
      return result.map((word: any) =>
        Word.create({
          id: word.id,
          word: word.word,
          addedAt: word.addedAt,
        })
      );
    } catch (error) {
      console.error("Error finding all words:", error);
      throw error;
    }
  }

  async updateByChildId({
    wordId,
    word,
    addedAt,
    childId,
  }: {
    wordId: number;
    word: string;
    addedAt: Date;
    childId: number;
  }): Promise<Word> {
    console.log("Updating word:", { wordId, word, addedAt, childId });
    try {
      const result = await this.db.$transaction(
        async (tx: Prisma.TransactionClient) => {
          // First verify the word belongs to the specified child
          const existingWord = await tx.words.findFirst({
            where: {
              id: wordId,
              childId: childId,
            },
          });

          if (!existingWord) {
            throw new Error(
              `Word with ID ${wordId} not found for child ${childId}`
            );
          }

          // Update the word
          return await tx.words.update({
            where: { id: wordId },
            data: { word, addedAt },
          });
        }
      );
      console.log("Updated word:", result);
      return Word.create({
        id: result.id,
        word: result.word,
        addedAt: result.addedAt,
        lastUpdate: result.lastUpdate,
      });
    } catch (error) {
      console.error("Error updating word:", error);
      throw error;
    }
  }

  async deleteMany(
    wordIds: number[]
  ): Promise<{ deletedCount: number; deletedWordIds: number[] }> {
    console.log("Deleting words with IDs:", wordIds);
    try {
      const result = await this.db.$transaction(
        async (tx: Prisma.TransactionClient) => {
          // First, get the words that exist to return their IDs
          const existingWords = await tx.words.findMany({
            where: {
              id: { in: wordIds },
            },
            select: { id: true },
          });

          const existingWordIds = existingWords.map((word: any) => word.id);

          // Delete the words
          const deleteResult = await tx.words.deleteMany({
            where: {
              id: { in: wordIds },
            },
          });

          return {
            deletedCount: deleteResult.count,
            deletedWordIds: existingWordIds,
          };
        }
      );
      console.log("Deleted words:", result);
      return result;
    } catch (error) {
      console.error("Error deleting words:", error);
      throw error;
    }
  }
}
