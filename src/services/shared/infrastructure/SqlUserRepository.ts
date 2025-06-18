import { Prisma } from "@prisma/client/scripts/default-index";
import { Nullable } from "../../../common/utils";
import { User } from "../domain/User";

export class SqlUserRepository {
  constructor(private readonly prisma: any) {}

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
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
