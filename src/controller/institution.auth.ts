import {Response, Request, NextFunction} from 'express';
import BadRequestError from '../errors/BadrequestError';
import validation from '../utils/validation';
import hashingModule, { comparePasswords } from '../utils/hashing.modules';
import { StatusCodes } from 'http-status-codes';
import { createSchool, getASchool, getASchoolForLogin, updateSchool,updateSchoolPassword } from '../services/school.service';
import { handleResponse } from '../utils/helper';
import { ISchool } from '../mongodb/models/institution.models';
import { createToken, tokenPayload } from '../utils/jwt';
import { generateResetPin } from '../utils/generateResetPin';
import { sendForgotPasswordMail } from '../utils/sendMail';
import { checkDBforPin } from '../services/school.service';



export const register = async (req: Request, res: Response, next: NextFunction): Promise <Response | void> => {
    try{
        if(!req.body){
            throw new BadRequestError('Empty input!!')
        }
        console.log("BODY: ", req.body);
        
        const {error} = validation.verify_institution.validate(req.body)
        if(error){
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: error.details.map((detail: {message: string}) => detail.message),
            });
        }
        // checking for existence
        if(await getASchool(req.body.email)){
            throw new BadRequestError('User alredy exist, please login!')
        }
        
        let hashed_password = await hashingModule(req.body.password)
        
        let dataToSave = {
            institution_name: req.body.institution_name,
            email: req.body.email,
            password: hashed_password,
        }
        const detail = await createSchool(dataToSave)
        console.log("DETAIL: ", detail);

        const payload = tokenPayload(detail as ISchool)

        const token = createToken({ payload })


        const data = {
            institution_ID: detail?.institution_ID,
            institution_name: detail?.institution_name,
            email: detail?.email,
            role: detail?.role,
            _id: detail?._id,
            createdAt: detail?.createdAt,
            updatedAt: detail?.updatedAt,
        }
        
        //send mail for verification or as a welcome 
        
        return handleResponse({
            res,
            statusCode: StatusCodes.CREATED,
            message: 'Istitution account created SuccessFully',
            data: {
                data,
                token
            }
        })

    }catch(error){
        next(error)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction): Promise <Response | void> => {
    try{
        if(!req.body){
            throw new BadRequestError('Empty input!!')
        }

        const {email, password} = req.body;
        let school = await getASchoolForLogin({email})
        if(!school){
            throw new BadRequestError('Institute Account not found!')
        }
        
        if(!await comparePasswords(password, school.password)){
            throw new BadRequestError('Incorrect password!')
        }
        
        const payload = tokenPayload(school as ISchool)

        const token = createToken({ payload })

        

        const data = {
            institution_ID: school?.institution_ID,
            institution_name: school?.institution_name,
            email: school?.email,
            role: school?.role,
            _id: school?._id,
            createdAt: school?.createdAt,
            updatedAt: school?.updatedAt,
        }

       
        return handleResponse({
            res,
            statusCode: StatusCodes.CREATED,
            message: 'Istitution account created SuccessFully',
            data: {
                data,
                token
            }
        })

    }catch(error){
        next(error)
    }
}

export const forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise <Response | void> => {
    try {
        let checkMail = await getASchoolForLogin(req.body) 
        if(!checkMail){
         throw new BadRequestError('This email is not registered')   
        }
        
        if(checkMail.resetpin){
            throw new BadRequestError('reset pin has already been use')   
        }
        
        const resetpin = generateResetPin();
        let updatedSchool = await updateSchool(checkMail, resetpin)

        
        const forgotPasswordPayload = {
            to: updatedSchool!.email,
            subject: "RESET PASSWORD",
            pin: resetpin,
        };

        sendForgotPasswordMail(forgotPasswordPayload);

        return handleResponse({
            res,
            statusCode: StatusCodes.OK,
            message: 'Please Check your Email for Reset Pin',
            data: { updatedSchool}
        })    
        
    } catch (error) {
        next(error)
    }
}

export const inputForgotPassword = async (req: Request, res: Response, next: NextFunction): Promise <Response | void> => {
    try {
        
        if(!req.body){
            throw new BadRequestError('Empty input body!')
        }
        let checkMail = await checkDBforPin(req.body) 
        if(!checkMail){
         throw new BadRequestError('Invalid pin')   
        }
        
        if(checkMail.resetpin){
            throw new BadRequestError('reset pin has already been used')   
        }
        
        const hashedPassword = await hashingModule(req.body.password)
        let password = hashedPassword
        console.log("pass==", password);
        console.log("pass==", hashedPassword);
        
        let updatedSchool = await updateSchoolPassword(checkMail, password)

        return handleResponse({
            res,
            statusCode: StatusCodes.OK,
            message: 'Password reset successfully',
            data: { updatedSchool}
        })    
        
    } catch (error) {
        next(error)
    }
}