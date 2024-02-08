import CustomAPIError from "./CustomAPIError";
import { StatusCodes } from "http-status-codes";

class AuthenticationError extends CustomAPIError {
    constructor(message: string) {
        super(message, StatusCodes.UNAUTHORIZED)
    }
}

export default AuthenticationError;