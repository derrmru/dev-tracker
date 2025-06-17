import { Nullable } from "../../common/utils";
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
    return await this.prisma.user.create({
      data: {
        id: newUser.getId(),
        email: newUser.getEmail(),
        name: newUser.getName(),
      },
    });
  }
}
