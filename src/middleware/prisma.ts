import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "../../generated/prisma";
import { NextFunction, Request, Response } from "express";

export const prisma = new PrismaClient().$extends(withAccelerate());

export function prismaMiddleware() {
  return async (_req: Request, _res: Response, next: NextFunction) => {
    try {
      next();
    } catch (error) {
      console.error(error);
      await prisma.$disconnect();
      process.exit(1);
    } finally {
      await prisma.$disconnect();
    }
  };
}
