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
      const children = result.map((child: any) =>
        Child.create({
          id: child.id,
          dateOfBirth: child.dateOfBirth,
          name: child.name,
          words: child.words,
        })
      );
      return children;
    } catch (error) {
      console.error("Error finding children:", error);
      throw new Error("Failed to find children");
    }
  }

  async findById(id: number): Promise<Nullable<Child>> {
    return await this.db.child.findUnique({
      where: { id },
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
      words: result.words,
      id: result.id,
    });
  }

  async delete(id: number): Promise<boolean> {
    console.log("Deleting child with id:", id);
    await this.db.$transaction(async (tx: Prisma.TransactionClient) => {
      await tx.child.delete({
        where: { id },
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
            words: child.getWords(),
          },
        });
      }
    );
    return Child.create({
      dateOfBirth: result.dateOfBirth,
      name: result.name,
      id: result.id,
      words: result.words,
    });
  }
}
