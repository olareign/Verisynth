import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./CustomAPIError";

class notFoundError extends CustomAPIError {
    constructor(message: string) {
        super(message, StatusCodes.NOT_FOUND)
    }
}

export default notFoundError