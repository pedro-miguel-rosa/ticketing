import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";
import { asyncHandler } from "@pmrtickets/common";

const router = express.Router();

router.get(
  "/api/tickets",
  asyncHandler(async (req: Request, res: Response) => {
    const tickets = await Ticket.find({});

    res.status(200).send(tickets);
  }),
);

export { router as indexTicketRouter };
