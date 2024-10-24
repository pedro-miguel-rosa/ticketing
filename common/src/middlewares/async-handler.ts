import { Request, Response, NextFunction, RequestHandler } from "express";

interface AsyncFunction {
  (req: Request, res: Response, next: NextFunction): Promise<any>;
}

export const asyncHandler = (fn: AsyncFunction): RequestHandler => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
