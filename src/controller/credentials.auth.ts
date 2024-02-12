import { Request, Response, NextFunction } from "express";
import { School } from "../mongodb/models/institution.models";
import { credential } from "../mongodb/models/credential.models";
import CustomAPIError from "../errors/CustomAPIError";
import { institution } from "../../types/custom";
import { handleResponse } from "../utils/helper";
import { StatusCodes } from "http-status-codes";
import { getASchool, updateSchoolSchema } from "../services/school.service";
import { UploadImage, getACredentials, updateCredentials } from "../services/credential.service";
import { SendEmail } from "../utils/sendMail";
import { Student } from "../mongodb/models/student.models";
import { UploadedFile } from "express-fileupload";

export const issueCertificate = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  try {
    const { email, institution_ID, institution_name } = req.user as institution; // Assuming req.user is properly typed
    console.log("email", email);
    console.log("institution_ID", institution_ID);
    
    if(!institution_ID){
      throw new CustomAPIError('Unauthorize Access to this route, kindly login', StatusCodes.UNAUTHORIZED);
    }
    if(!req.body){
      throw new Error('Empty input body')
    }
    const school = await getASchool({ email: email });
    console.log("SCHOOL: ", school);
    
    const StudentData = await credential.create({ institution_id: school?._id, ...req.body});
    console.log("Student", StudentData);
    
    if (!StudentData) {
      throw new CustomAPIError("Failed to create certificate", 500);
    }
    //send student mail //TODO: SEND STUDENT EMAIL
    await SendEmail(
      StudentData.recipient_email,
      "Congratulations!, Here's Your Certification",
      `<!DOCTYPE html>
      <html>
      <head>
        <style>
        body {
          font-family: Arial, sans-serif;
      }
      
      .header {
          background-color: #f8f9fa;
          text-align: center;
          padding: 20px;
      }
      
      .content {
          margin: 20px;
      }
      
      .footer {
          background-color: #f8f9fa;
          text-align: center;
          padding: 20px;
      }
        </style>
      </head>
      <body>
          <div class="header">
              <h1>Congratulations, ${StudentData.fullname}!</h1>
          </div>
          <div class="content">
              <p>We are thrilled to inform you that you have successfully been issued a certificate.</p>
              <p><strong>Issued by:</strong></p>
              <p><strong>Certificate Details:</strong></p>
              <ul>
                <li>Certificate ID: ${StudentData.credential_ID}</li>
                <li>Recipient Name: ${StudentData.fullname} </li>
                <li>Recipient ID: ${StudentData.recipient_ID} </li>
                <li>Recipient Email: ${StudentData.recipient_email} </li>
                <li>Degree Name: ${StudentData.degree_name} </li>
                <li>Awarded Date: ${StudentData.awarded_date} </li>
                <li>Expiration Date: ${StudentData.expiration_date} </li>
                <li>File link: ${StudentData.file_string} </li>
              </ul>
              <p>Your hard work and dedication have paid off and we are confident that you will achieve great things in your future endeavors.</p>
          </div>
          <div class="footer">
              <p>Best Regards,</p>
              <p>${institution_name}</p>
          </div>
      </body>
      </html>
      `
      )
    const updateAdminData = await updateSchoolSchema({email: email})
    
    return handleResponse({
      res,
      statusCode: StatusCodes.CREATED,
      message: 'Credential created successFully',
      data: {
          StudentData
      }
    })

  } catch (error) {
      next(error)
  }
};

export const getSchoolAwardedCredential = async (req: Request, res: Response, next: NextFunction): Promise <Response | void> => {
    try {
        const { email } = req.user as institution;

        const credentialsLog = await credential.find({institution_id: req.query.issuerid}).lean()
        if(!credentialsLog){
        throw new  CustomAPIError('No Credentials found for this issuer',StatusCodes.NOT_FOUND)
        }
        let total = credentialsLog.length
        return handleResponse({
          res,
          statusCode: StatusCodes.OK,
          message: 'Credentials list of this Issuer, successfully fetched.',
          data: {
            total,
            credentialsLog
          }
        })
    } catch (error) {
        next(error)
    }
}

export const verifyCredential = async (req: Request, res: Response, next: NextFunction): Promise <Response | void> => {
  try {
      if(!req.body){
        throw new Error('Empty input body')
      }
      const credential = await getACredentials( req.body );
      if(!credential){
        throw  new CustomAPIError("The requested resource was not found",StatusCodes.NOT_FOUND)
      }
      return handleResponse({
        res,
        statusCode: StatusCodes.OK,
        message: "User credential is Valid",
        data: {
          credential
        }
      });
  } catch (error) {
      next(error)
  }
}

export const uploadCredentialFile = async (req: Request, res: Response, next: NextFunction): Promise <Response | void> => {
  try {
      const {email} = req.user as institution;
      const credential_ID = req.query.credential_ID as string;
      console.log("credential_ID: ", credential_ID);
      
      const credential = await getACredentials({ credential_ID })
      if(!credential){
        throw new Error('Invalid credential ID')
      }

      const file = req.files?.image as UploadedFile;
     

      const result = await UploadImage(file.data, `credential-${credential_ID}`, "CREDENTIAL")
        
      const credential_file: string = result.secure_url;

      let file_string = credential_file
      const updatedCredential = await updateCredentials( { credential_ID: credential_ID}, file_string);
      console.log("Updated Credential: ", updatedCredential);
      
      return handleResponse({
        res,
        statusCode: StatusCodes.OK,
        message: "User credential is Valid",
        data: {
          credential_file,
          updatedCredential
        }
      });
      
  } catch (error) {
      next(error)
  }
}

