import express from "express";
import { prisma } from "../middleware/prisma";
import { CreateChildUseCaseRequest } from "../services/children/CreateChild/application/CreateChildUseCaseRequest";
import { CreateChildUseCase } from "../services/children/CreateChild/application/CreateChildUseCase";
import { SqlChildRepository } from "../services/shared/infrastructure/SqlChildRepository";
import { FindAllChildrenUseCaseRequest } from "../services/children/FindAllChildren/application/FindAllChildrenUseCaseRequest";
import { FindAllChildrenUseCase } from "../services/children/FindAllChildren/application/FindAllChildrenUseCase";
import { FindChildUseCaseRequest } from "../services/children/FindChild/application/FindChildUseCaseRequest";
import { FindChildUseCase } from "../services/children/FindChild/application/FindChildUseCase";
import { DeleteChildUseCaseRequest } from "../services/children/DeleteChild/application/DeleteChildUseCaseRequest";
import { DeleteChildUseCase } from "../services/children/DeleteChild/application/DeleteChildUseCase";
import { UpdateChildUseCaseRequest } from "../services/children/UpdateChild/application/UpdateChildUseCaseRequest";
import { UpdateChildUseCase } from "../services/children/UpdateChild/application/UpdateChildUseCase";
import { SqlUserRepository } from "../services/user/infrastructure/SqlUserRepository";

export const router = express.Router({ mergeParams: true });

router.post("/create", async (req, res, next) => {
  try {
    const childRepository = new SqlChildRepository(prisma);
    const request = new CreateChildUseCaseRequest(
      req.body.name,
      new Date(req.body.dateOfBirth),
      req.context?.user.getId()!
    );
    const createChildUseCase = new CreateChildUseCase(childRepository);
    const child = await createChildUseCase.run(request);
    res.status(200).json(child);
  } catch (error) {
    next(error);
  }
});

router.get("/all", async (req, res, next) => {
  try {
    const childRepository = new SqlChildRepository(prisma);
    const request = new FindAllChildrenUseCaseRequest(
      Number(req.context?.user.getId())
    );
    const findAllChildrenUseCase = new FindAllChildrenUseCase(childRepository);
    const children = await findAllChildrenUseCase.run(request);
    console.log("Children found:", children);
    res.status(200).json(children);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const childRepository = new SqlChildRepository(prisma);
    const request = FindChildUseCaseRequest.create(
      Number(req.params.id),
      Number(req.context?.user.getId())
    );
    const findChildUseCase = new FindChildUseCase(childRepository);
    const child = await findChildUseCase.run(request);
    console.log("Child found:", child);
    res.status(200).json(child);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const childRepository = new SqlChildRepository(prisma);
    const request = DeleteChildUseCaseRequest.create(
      Number(req.params.id),
      Number(req.context?.user.getId())
    );
    const deleteChildUseCase = new DeleteChildUseCase(childRepository);
    const child = await deleteChildUseCase.run(request);
    console.log("Child deleted:", child);
    res.status(200).json(child);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const childRepository = new SqlChildRepository(prisma);
    const request = new UpdateChildUseCaseRequest(
      Number(req.params.id),
      req.body.name,
      new Date(req.body.dateOfBirth),
      Number(req.context?.user.getId()!)
    );
    const updateChildUseCase = new UpdateChildUseCase(childRepository);
    const child = await updateChildUseCase.run(request);
    console.log("Child updated:", child);
    res.status(200).json(child);
  } catch (error) {
    next(error);
  }
});
