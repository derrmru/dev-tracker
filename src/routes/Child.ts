import express from "express";
import { prisma } from "../middleware/prisma";
import { CreateChildUseCaseRequest } from "../services/CreateChild/application/CreateChildUseCaseRequest";
import { CreateChildUseCase } from "../services/CreateChild/application/CreateChildUseCase";
import { SqlChildRepository } from "../services/shared/infrastructure/SqlChildRepository";
import { FindAllChildrenUseCaseRequest } from "../services/FindAllChildren/application/FindAllChildrenUseCaseRequest";
import { FindAllChildrenUseCase } from "../services/FindAllChildren/application/FindAllChildrenUseCase";
import { FindChildUseCaseRequest } from "../services/FindChild/application/FindChildUseCaseRequest";
import { FindChildUseCase } from "../services/FindChild/application/FindChildUseCase";
import { DeleteChildUseCaseRequest } from "../services/DeleteChild/application/DeleteChildUseCaseRequest";
import { DeleteChildUseCase } from "../services/DeleteChild/application/DeleteChildUseCase";
import { UpdateChildUseCaseRequest } from "../services/UpdateChild/application/UpdateChildUseCaseRequest";
import { UpdateChildUseCase } from "../services/UpdateChild/application/UpdateChildUseCase";

export const router = express.Router({ mergeParams: true });

router.post("/create", async (req, res, next) => {
  try {
    const childRepository = new SqlChildRepository(prisma);
    const request = new CreateChildUseCaseRequest(
      req.body.name,
      new Date(req.body.dateOfBirth),
      req.body.words ?? []
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
    const request = new FindAllChildrenUseCaseRequest();
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
    const request = FindChildUseCaseRequest.create(Number(req.params.id));
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
    const request = DeleteChildUseCaseRequest.create(Number(req.params.id));
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
      new Date(req.body.dateOfBirth)
    );
    const updateChildUseCase = new UpdateChildUseCase(childRepository);
    const child = await updateChildUseCase.run(request);
    console.log("Child updated:", child);
    res.status(200).json(child);
  } catch (error) {
    next(error);
  }
});
