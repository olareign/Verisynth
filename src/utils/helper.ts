import { Response } from "express";


export const handleResponse = function ({ res, statusCode, message, data }: { res: Response; message: string, statusCode: number; data: any; },): Response {
        return res.status(statusCode).json({
          message,
          data,
        });
      };