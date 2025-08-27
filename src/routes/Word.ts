import express from "express";
import { prisma } from "../middleware/prisma";
import { CreateWordUseCase } from "../services/words/CreateWord/CreateWordUseCase";
import { CreateWordUseCaseRequest } from "../services/words/CreateWord/CreateWordUseCaseRequest";
import { SqlWordsRepository } from "../services/shared/infrastructure/SqlWordsRepository";

export const router = express.Router({ mergeParams: true });

router.post("/:childId", async (req, res, next) => {
  try {
    const wordRepository = new SqlWordsRepository(prisma);
    const request = CreateWordUseCaseRequest.create({
      word: req.body.word,
      childId: Number(req.params.childId),
    });
    const createWordUseCase = new CreateWordUseCase(wordRepository);
    await createWordUseCase.run(request);
    console.log("Word created successfully");
    res.status(201).send("Word created successfully");
  } catch (error) {
    next(error);
  }
});
