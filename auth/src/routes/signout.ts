import express from "express";

const router = express.Router();

router.post(
  "/api/users/signout",
  async (req: express.Request, res: express.Response) => {
    res.status(200).send("SignOut");
  },
);

export { router as signoutRouter };
