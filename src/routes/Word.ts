import express from "express";
import { prisma } from "../middleware/prisma";
import { CreateWordUseCase } from "../services/words/CreateWord/CreateWordUseCase";
import { CreateWordUseCaseRequest } from "../services/words/CreateWord/CreateWordUseCaseRequest";
import { FindAllWordsByChildIdUseCase } from "../services/words/FindAllWordsBtChilldId/FindAllWordsByChildIdUseCase";
import { FindAllWordsByChildIdUseCaseRequest } from "../services/words/FindAllWordsBtChilldId/FindAllWordsByChildIdUseCaseRequest";
import { UpdateWordByChildIdUseCase } from "../services/words/UpdateWordByChildId/UpdateWordByChildIdUseCase";
import { UpdateWordByChildIdUseCaseRequest } from "../services/words/UpdateWordByChildId/UpdateWordByChildIdUseCaseRequest";
import { DeleteManyWordsUseCase } from "../services/words/DeleteManyWords/DeleteManyWordsUseCase";
import { DeleteManyWordsUseCaseRequest } from "../services/words/DeleteManyWords/DeleteManyWordsUseCaseRequest";
import { SqlWordsRepository } from "../services/shared/infrastructure/SqlWordsRepository";
import { Word } from "../services/shared/domain/Word";
import { SqlChildRepository } from "../services/shared/infrastructure/SqlChildRepository";
import { SqlUserRepository } from "../services/user/infrastructure/SqlUserRepository";

export const router = express.Router({ mergeParams: true });

router.post("/:childId", async (req, res, next) => {
  try {
    const wordRepository = new SqlWordsRepository(prisma);
    const childRepository = new SqlChildRepository(prisma);
    const request = CreateWordUseCaseRequest.create({
      word: req.body.word,
      childId: Number(req.params.childId),
      userId: Number(req.context?.user.getId()),
      addedAt: new Date(req.body.addedAt),
    });
    const createWordUseCase = new CreateWordUseCase(
      wordRepository,
      childRepository
    );
    await createWordUseCase.run(request);
    console.log("Word created successfully");
    res.status(201).send("Word created successfully");
  } catch (error) {
    next(error);
  }
});

router.get("/:childId/all", async (req, res, next) => {
  try {
    const wordRepository = new SqlWordsRepository(prisma);
    const childRepository = new SqlChildRepository(prisma);
    const request = FindAllWordsByChildIdUseCaseRequest.create(
      Number(req.params.childId),
      Number(req.context?.user.getId())
    );
    const findAllWordsByChildIdUseCase = new FindAllWordsByChildIdUseCase(
      wordRepository,
      childRepository
    );
    const words = await findAllWordsByChildIdUseCase.run(request);
    console.log("Words found:", words);
    res.status(200).json(words);
  } catch (error) {
    next(error);
  }
});

router.put("/:childId", async (req, res, next) => {
  try {
    const wordRepository = new SqlWordsRepository(prisma);
    const childRepository = new SqlChildRepository(prisma);
    const request = UpdateWordByChildIdUseCaseRequest.create({
      wordId: Number(req.body.word.id),
      word: Word.create({
        ...req.body.word,
        addedAt: new Date(req.body.word.addedAt),
      }),
      childId: Number(req.params.childId),
      userId: Number(req.context?.user.getId()),
    });
    const updateWordByChildIdUseCase = new UpdateWordByChildIdUseCase(
      wordRepository,
      childRepository
    );
    const updatedWord = await updateWordByChildIdUseCase.run(request);
    console.log("Word updated successfully:", updatedWord);
    res.status(200).json(updatedWord);
  } catch (error) {
    next(error);
  }
});

router.delete("/many", async (req, res, next) => {
  try {
    const wordRepository = new SqlWordsRepository(prisma);
    const childRepository = new SqlChildRepository(prisma);
    const request = DeleteManyWordsUseCaseRequest.create({
      wordIds: req.body.wordIds,
      userId: req.context?.user.getId(),
    });
    const deleteManyWordsUseCase = new DeleteManyWordsUseCase(
      wordRepository,
      childRepository
    );
    const result = await deleteManyWordsUseCase.run(request);
    console.log("Words deleted successfully:", result);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});
