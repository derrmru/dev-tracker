import { prisma } from "../middleware/prisma";
import { CreateUserUseCaseRequest } from "../services/CreateUser/application/CreateUserUseCaseRequest";
import { CreateUserUseCase } from "../services/CreateUser/application/CreateUserUseCase";
import { SqlUserRepository } from "../services/shared/infrastructure/SqlUserRepository";
import express from "express";
import { FindAllUsersUseCaseRequest } from "../services/FindAllUsers/application/FindAllUsersUseCaseRequest";
import { FindAllUsersUseCase } from "../services/FindAllUsers/application/FindAllUsersUseCase";
import { FindUserUseCaseRequest } from "../services/FindUser/application/FindUserUseCaseRequest";
import { FindUserUseCase } from "../services/FindUser/application/FindUserUseCase";

export const router = express.Router({ mergeParams: true });

router.post("/create", async (req, res, next) => {
  try {
    const userRepository = new SqlUserRepository(prisma);
    const request = new CreateUserUseCaseRequest(req.body.name, req.body.email);
    const createUserUseCase = new CreateUserUseCase(userRepository);
    const user = await createUserUseCase.run(request);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.get("/all", async (req, res, next) => {
  try {
    const userRepository = new SqlUserRepository(prisma);
    const request = new FindAllUsersUseCaseRequest();
    const findAllUsersUseCase = new FindAllUsersUseCase(userRepository);
    const users = await findAllUsersUseCase.run(request);
    console.log("Users found:", users);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const userRepository = new SqlUserRepository(prisma);
    const request = FindUserUseCaseRequest.create(Number(req.params.id));
    const findUserUseCase = new FindUserUseCase(userRepository);
    const user = await findUserUseCase.run(request);
    console.log("User found:", user);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});
