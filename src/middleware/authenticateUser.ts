import { NextFunction, Request, Response, response } from "express";
import CustomAPIError from "../errors/index";
import { StatusCodes } from "http-status-codes";
import { log } from "console";
import { decodeToken } from "../utils/jwt";


interface CustomRequest extends Request {
    user?: any;
}


const authenticateUser = async (req: CustomRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        console.log("Validate")
        let token: string | any = req.signedCookies.Token
        const authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith('Bearer')) {        
            token = authHeader.split(' ')[1];
        }
        // check for token
        if (!token) {
            throw new CustomAPIError.AuthenticationError('Authentication Failed')
        }
               
        let userData = await decodeToken(token)
       
        req.user = userData;

        next();
    } catch (error) {
        console.log(error);
        
        throw new CustomAPIError.AuthenticationError('Authentication Failed')
    }
}

interface CustomRequest extends Request {
    user?: any;
}

const UnauthorizePermission= (...roles:string[]): any => {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        console.log(roles, "checking your role....", req.user)
        if (!roles.includes(req.user?.role)) {
            return next(new CustomAPIError.AuthorizationError('Unauthorize access to this site'))
        }
        next();
    }
}

export {
    authenticateUser,
    UnauthorizePermission
} 
