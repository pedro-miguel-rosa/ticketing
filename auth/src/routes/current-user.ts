import express from "express";

const router = express.Router();

router.get(
  "/api/users/currentuser",
  async (req: express.Request, res: express.Response) => {
    res.status(200).send("Hi there!");
  },
);

export { router as currentUserRouter };
