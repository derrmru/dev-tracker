import { Prisma } from "@prisma/client/scripts/default-index";
import { Nullable } from "../../../common/utils";
import { Child } from "../domain/Child";

export class SqlChildRepository {
  constructor(private readonly db: any) {}

  async findAll(): Promise<Child[]> {
    console.log("Finding all children");
    try {
      const result = await this.db.$transaction(
        async (tx: Prisma.TransactionClient) => {
          return await tx.child.findMany();
        }
      );
      console.log("Found children:", result);
      if (!result || result.length === 0) {
        return [];
      }
      const childIds = result.map((child: { id: number }) => child.id);
      const wordsByChildId = await this.db.$transaction(
        async (tx: Prisma.TransactionClient) => {
          const words = await tx.words.findMany({
            where: {
              childId: {
                in: childIds,
              },
            },
          });
          return words.reduce((acc: any, word: any) => {
            if (!acc[word.childId]) {
              acc[word.childId] = [];
            }
            acc[word.childId].push(word);
            return acc;
          }, {});
        }
      );
      const children = result.map((child: any) =>
        Child.create({
          id: child.id,
          dateOfBirth: child.dateOfBirth,
          name: child.name,
          words: wordsByChildId[child.id] ?? [],
        })
      );
      return children;
    } catch (error) {
      console.error("Error finding children:", error);
      throw new Error("Failed to find children");
    }
  }

  async findById(id: number): Promise<Nullable<Child>> {
    const childResult = await this.db.$transaction(
      async (tx: Prisma.TransactionClient) => {
        return await tx.child.findUnique({
          where: { id },
        });
      }
    );
    if (!childResult) {
      return null;
    }
    const wordsResult = await this.db.$transaction(
      async (tx: Prisma.TransactionClient) => {
        return await tx.words.findMany({
          where: { childId: id },
        });
      }
    );
    return Child.create({
      id: childResult.id,
      dateOfBirth: childResult.dateOfBirth,
      name: childResult.name,
      words: wordsResult ?? [],
    });
  }

  async create(newChild: Child): Promise<Child> {
    console.log("Creating", newChild);
    const result = await this.db.$transaction(
      async (tx: Prisma.TransactionClient) => {
        return await tx.child.create({
          data: {
            dateOfBirth: newChild.getDateOfBirth(),
            name: newChild.getName(),
          },
        });
      }
    );
    console.log("Created", result);
    return Child.create({
      dateOfBirth: result.dateOfBirth,
      name: result.name,
      words: [],
      id: result.id,
    });
  }

  async delete(id: number): Promise<boolean> {
    console.log("Deleting child with id:", id);
    await this.db.$transaction(async (tx: Prisma.TransactionClient) => {
      const existingChild = await tx.child.findUnique({
        where: { id },
      });

      if (!existingChild) {
        throw new Error(`Child with id ${id} not found`);
      }
      await tx.words.deleteMany({
        where: {
          childId: id,
        },
      });
      await tx.child.delete({
        where: {
          id,
        },
      });
    });
    return true;
  }

  async update(child: Child): Promise<Child> {
    const result = await this.db.$transaction(
      async (tx: Prisma.TransactionClient) => {
        return await tx.child.update({
          where: { id: child.getId() },
          data: {
            dateOfBirth: child.getDateOfBirth(),
            name: child.getName(),
          },
        });
      }
    );
    return Child.create({
      dateOfBirth: result.dateOfBirth,
      name: result.name,
      id: result.id,
      words: [],
    });
  }
}
