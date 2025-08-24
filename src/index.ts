import express from "express";
import { prismaMiddleware } from "./middleware/prisma";
import { router as children } from "./routes/Child";
import { corsOptions } from "./middleware/cors";
import { errorHandler } from "./middleware/errorHandler";
import cors from "cors";
import helmet from "helmet";

const app = express();
const port = 3000;

app.use(helmet());
app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(prismaMiddleware());
app.use(cors(corsOptions));

app.use("/children", children);

app.use((_req, res, _next) => {
  res.status(404).send("Sorry can't find that!");
});

app.use(errorHandler as express.ErrorRequestHandler);

app.listen(port, () => {
  return console.log(
    `Express server is listening at http://localhost:${port} 🚀`
  );
});
