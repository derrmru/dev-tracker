import { PrismaClient } from "@prisma/client";
import { User } from "../domain/User";

export class SqlUserRepository {
  constructor(private db: PrismaClient) {}

  async findUserByExternalId(externalId: string) {
    const result = await this.db.user.findUnique({
      where: { externalId },
    });
    return User.create({ ...result });
  }

  async findById(id: number) {
    const result = await this.db.user.findUnique({
      where: { id },
    });
    return User.create({ ...result });
  }
}
