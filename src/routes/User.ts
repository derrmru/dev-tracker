import { isNullOrUndefined } from "../common/utils";
import { prisma } from "../middleware/prisma";
import { CreateUserUseCase } from "../shared/application/CreateUserUseCase";
import { SqlUserRepository } from "../shared/infrastructure/SqlUserRepository";
import express from "express";

const router = express.Router({ mergeParams: true });

router.post("/create", async (req, res) => {
  const userRepository = new SqlUserRepository(prisma);
  const createUserUseCase = new CreateUserUseCase(userRepository);
  const user = await createUserUseCase.execute({ ...req.body });
  res.status(200).json(user);
});

router.get("/all", async (req, res) => {
  const userRepository = new SqlUserRepository(prisma);
  const users = await userRepository.findAll();
  if (isNullOrUndefined(users)) {
    res.status(404).json({ message: "No users found" });
    return;
  }
  res.status(200).json(users);
});

router.get("/:id", async (req, res) => {
  const userRepository = new SqlUserRepository(prisma);
  const user = await userRepository.findById(Number(req.params.id));
  if (isNullOrUndefined(user)) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.status(200).json(user);
});

export default router;
