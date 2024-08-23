import express from "express";
import mongoose from "mongoose";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.use(express.json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.use("/", (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

try {
  await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");
} catch (err) {
  console.error(err);
}

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
