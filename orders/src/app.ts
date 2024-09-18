import express from "express";
import { currentUser, errorHandler, NotFoundError } from "@pmrtickets/common";
import cookieSession from "cookie-session";
import { deleteOrderRouter } from "./routes/delete";
import { indexOrderRouter } from "./routes";
import { newOrderRouter } from "./routes/new";
import { showOrderRouter } from "./routes/show";

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" }),
);

app.use(currentUser);

app.use(deleteOrderRouter);
app.use(indexOrderRouter);
app.use(newOrderRouter);
app.use(showOrderRouter);


app.use("/", (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
