import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";
import { asyncHandler, NotFoundError } from "@pmrtickets/common";

const router = express.Router();

router.get(
  "/api/tickets/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      throw new NotFoundError();
    }

    res.status(200).send(ticket);
  }),
);

export { router as showTicketRouter };
