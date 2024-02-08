import { Response } from "express";


export const handleResponse = function (
    { res, statusCode, message, data }: {
      res: Response;
      statusCode: number;
      message: string;
      data: any;
    },
    ): Response {
        return res.status(statusCode).json({
          message,
          data,
        });
      };