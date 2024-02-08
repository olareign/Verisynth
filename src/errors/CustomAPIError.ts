import { StatusCodes } from "http-status-codes";

class CustomAPIError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR){
        super(message);
        this.statusCode = statusCode;
    }
}

export default CustomAPIError;