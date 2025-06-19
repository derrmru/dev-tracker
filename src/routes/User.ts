import { isDefined } from "../common/utils";
import { prisma } from "../middleware/prisma";
import { CreateUserUseCaseRequest } from "../services/CreateUser/application/CreateUserUseCaseRequest";
import { CreateUserUseCase } from "../services/CreateUser/application/CreateUserUseCase";
import { SqlUserRepository } from "../services/shared/infrastructure/SqlUserRepository";
import express from "express";
import { ValidationResult } from "../services/bases/ValidationResult";
import { UseCaseError } from "../services/bases/UseCaseError";

export const router = express.Router({ mergeParams: true });

router.post("/create", async (req, res, next) => {
  try {
    const userRepository = new SqlUserRepository(prisma);
    const request = new CreateUserUseCaseRequest(req.body.name, req.body.email);
    const createUserUseCase = new CreateUserUseCase(userRepository);
    const user = await createUserUseCase.execute(request);
    res.status(200).json(user);
  } catch (validationResult) {
    next(validationResult);
  }
});

router.get("/all", async (req, res) => {
  const userRepository = new SqlUserRepository(prisma);
  const users = await userRepository.findAll();
  if (!isDefined(users)) {
    res.status(404).json({ message: "No users found" });
    return;
  }
  res.status(200).json(users);
});

router.get("/:id", async (req, res) => {
  const userRepository = new SqlUserRepository(prisma);
  const user = await userRepository.findById(Number(req.params.id));
  if (!isDefined(user)) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.status(200).json(user);
});
