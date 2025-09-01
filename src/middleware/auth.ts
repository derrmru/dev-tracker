import { auth } from "express-oauth2-jwt-bearer";
import {
  Request,
  ParamsDictionary,
  Response,
  NextFunction,
} from "express-serve-static-core";
import { decodeJwt } from "jose";
import { ParsedQs } from "qs";
import { SqlUserRepository } from "../services/user/infrastructure/SqlUserRepository";
import { prisma } from "./prisma";
import { User } from "../services/user/domain/User";

declare module "express-serve-static-core" {
  interface Request {
    context?: {
      user: User;
    };
  }
}

export const checkJwt = auth({
  audience: "child_dev_tracker_api",
  issuerBaseURL: "https://dev-2v6-0k-c.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

export async function isAuthenticated(
  req: Request,
  res: Response<any, Record<string, any>, number>,
  next: NextFunction // Use NextFunction type
) {
  try {
    // First check JWT
    await new Promise<void>((resolve, reject) => {
      checkJwt(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Then check if user exists
    const { sub } = decodeJwt(req.headers.authorization?.split(" ")[1] || "");

    if (!sub || typeof sub !== "string") {
      return res.status(401).send("Unauthorized");
    }

    const userRepository = new SqlUserRepository(prisma);
    const user = await userRepository.findUserByExternalId(sub);

    if (!user) {
      req.context = { user: User.create({ id: -1, externalId: "" }) };
      return res.status(401).send("Unauthorized");
    }

    req.context = { user };

    console.log("Authenticated user:", user);
    next(); // Only call next() once on success
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).send("Unauthorized");
  }
}
