import express from "express";
import { prisma } from "../middleware/prisma";
import { CreateHeightUseCase } from "../services/height/application/CreateHeight/CreateHeightUseCase";
import { CreateHeightUseCaseRequest } from "../services/height/application/CreateHeight/CreateHeightUseCaseRequest";
import { FindAllHeightsByChildIdUseCase } from "../services/height/application/FindAllHeightsByChildId/FindAllHeightsByChildIdUseCase";
import { FindAllHeightsByChildIdUseCaseRequest } from "../services/height/application/FindAllHeightsByChildId/FindAllHeightsByChildIdUseCaseRequest";
import { SqlHeightRepository } from "../services/height/infrastructure/SqlHeightRepository";
import { SqlChildRepository } from "../services/shared/infrastructure/SqlChildRepository";

export const router = express.Router({ mergeParams: true });

router.post("/:childId", async (req, res, next) => {
  try {
    const heightRepository = new SqlHeightRepository(prisma);
    const childRepository = new SqlChildRepository(prisma);
    const request = CreateHeightUseCaseRequest.create({
      height: Number(req.body.height),
      childId: Number(req.params.childId),
      userId: Number(req.context?.user.getId()),
      addedAt: req.body.addedAt ? new Date(req.body.addedAt) : new Date(),
      unit: req.body.unit || "cm",
    });
    const createHeightUseCase = new CreateHeightUseCase(
      heightRepository,
      childRepository
    );
    const createdHeight = await createHeightUseCase.run(request);
    res.status(201).json(createdHeight);
  } catch (error) {
    console.error("Error creating height:", error);
    next(error);
  }
});

// Get all heights for a child
router.get("/:childId", async (req, res, next) => {
  try {
    const heightRepository = new SqlHeightRepository(prisma);
    const childRepository = new SqlChildRepository(prisma);
    const request = FindAllHeightsByChildIdUseCaseRequest.create(
      Number(req.params.childId),
      Number(req.context?.user.getId())
    );
    const findAllHeightsByChildIdUseCase = new FindAllHeightsByChildIdUseCase(
      heightRepository,
      childRepository
    );
    const heights = await findAllHeightsByChildIdUseCase.run(request);
    res.status(200).json(heights.getHeights());
  } catch (error) {
    console.error("Error fetching heights:", error);
    next(error);
  }
});
