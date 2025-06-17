import express from "express";
import { prismaMiddleware } from "./middleware/prisma";
import users from "./routes/User";

const app = express();
const port = 3000;

app.use(prismaMiddleware());
app.use("/users", users);

app.listen(port, () => {
  return console.log(
    `Express server is listening at http://localhost:${port} 🚀`
  );
});
