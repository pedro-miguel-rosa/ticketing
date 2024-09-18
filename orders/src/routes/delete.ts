import express, { Request, Response } from "express";
import {
  asyncHandler,
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@pmrtickets/common";
import { Order, OrderStatus } from "../models/order";

const router = express.Router();

router.delete(
  "/api/orders/:orderId",
  requireAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    // Publishing an event saying this was cancelled

    res.status(204).send(order);
  }),
);

export { router as deleteOrderRouter };