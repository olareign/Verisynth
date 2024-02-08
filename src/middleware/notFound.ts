import { StatusCodes } from "http-status-codes";
import { Request, Response } from 'express'


const notFoundMiddleware = (req: Request, res: Response) => res.status(StatusCodes.BAD_REQUEST).send('Route does not exist');

export default notFoundMiddleware;