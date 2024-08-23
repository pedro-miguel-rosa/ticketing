import express from "express";

const router = express.Router();

router.post(
  "/api/users/signin",
  async (req: express.Request, res: express.Response) => {
    res.status(200).send("SignIn!");
  },
);

export { router as signinRouter };
