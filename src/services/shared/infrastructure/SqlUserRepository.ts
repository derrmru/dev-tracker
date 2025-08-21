import { Prisma } from "@prisma/client/scripts/default-index";
import { Nullable } from "../../../common/utils";
import { User } from "../domain/User";

export class SqlUserRepository {
  constructor(private readonly prisma: any) {}

  async findAll(): Promise<User[]> {
    console.log("Finding all users");
    try {
      const result = await this.prisma.$transaction(
        async (tx: Prisma.TransactionClient) => {
          return await tx.user.findMany();
        }
      );
      console.log("Found users:", result);
      if (!result || result.length === 0) {
        return [];
      }
      const users = result.map((user: any) =>
        User.create({
          id: user.id,
          email: user.email,
          name: user.name,
        })
      );
      return users;
    } catch (error) {
      console.error("Error finding users:", error);
      throw new Error("Failed to find users");
    }
  }

  async findById(id: number): Promise<Nullable<User>> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async create(newUser: User): Promise<User> {
    console.log("Creating", newUser);
    const result = await this.prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        return await tx.user.create({
          data: {
            email: newUser.getEmail(),
            name: newUser.getName(),
          },
        });
      }
    );
    return User.create({
      email: result.email,
      name: result.name,
      id: result.id,
    });
  }
}
