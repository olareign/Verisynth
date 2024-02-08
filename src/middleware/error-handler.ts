import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from 'express'
import { handleResponse } from "../utils/helper";

const errorHandlerMiddleware = (err: any, req:Request, res:Response, next: NextFunction):  Response  => {
    // creation of the customError variable 
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || 'something went wrong try again later',
    };

    // handling the err message
    if(err.name === 'ValidationError'){
        customError.message = Object.values(err.errors)
        .map((item: any) => item.message)
        .join(',');
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }
    // handling the err code
    if(err.code && err.code === 11000){
        customError.message = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
        customError.statusCode = 400 || StatusCodes.BAD_REQUEST;
    }
    if(err.name === 'CastError'){
        customError.message = `no item was found with the given ID: ${err.value}`;
        customError.statusCode = 404 || StatusCodes.NOT_FOUND;
    }
    if(err.name == "TokenExpiredError") {
        customError = {
            message : "Invalid token, sign in",
            statusCode: StatusCodes.FORBIDDEN
        }
    }
    return handleResponse({res, statusCode: customError.statusCode, message: customError.message, data: null})
    // return res.status(customError.statusCode).json({ message: customError.message })
}

export default errorHandlerMiddleware;
