import { NextFunction, Request, Response, response } from "express";
import CustomAPIError from "../errors/index";
import { StatusCodes } from "http-status-codes";
import {JwtPayload, Secret, verify} from "jsonwebtoken";  
import { decodeToken } from "../utils/jwt";
import { School } from "../mongodb/models/institution.models";




const authenticateUser = async function (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        console.log("Validate")
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {        
            return next(new CustomAPIError.AuthenticationError("You are not logged in, Please sign in"))
        }
    
        let userData = await decodeToken(token)
        console.log("userData", userData);
        const issuer = await School.findOne({institution_ID : userData.institution_ID})
        if(!issuer){
            throw new CustomAPIError.AuthenticationError("Invalid Details, please sign in")
        }
        req.user = userData;
        console.log(req.user);

        next();
    } catch (error) {
        console.log(error);
        
        throw new CustomAPIError.AuthenticationError('Authentication Failed')
    }
}

const UnauthorizePermission= (...roles:string[]): any => {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log(roles, "checking your role....", req.user)
        if (!roles.includes(req.user?.role || '')) {
            return next(new CustomAPIError.AuthorizationError('Unauthorize access to this site'))
        }
        next();
    }
}

export {
    authenticateUser,
    UnauthorizePermission
} 
