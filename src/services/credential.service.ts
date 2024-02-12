import { ICredentials, credential } from "../mongodb/models/credential.models";
import {v2 as cloudinary} from 'cloudinary';

export const createCredentials = async function(payload: ICredentials): Promise <null | ICredentials>{
    try {
        const credential_details = await credential.create({...payload})
        return credential_details;
    } catch (error) {
        throw error
    }
}

export const updateCredentials = async function(filter: Partial<Pick<ICredentials,'credential_ID'>>, payload: string): Promise < null | ICredentials>{
    try {
        const credential_details = await credential.findOneAndUpdate({
            credential_ID: filter['credential_ID']
        },{
            file_string: payload
        },{new: true});

        return credential_details;
    } catch (error) {
        throw error
    }
}

export const getACredentials = async function(filter: Partial<Pick<ICredentials, 'credential_ID'>>): Promise < null | ICredentials>{
    try {
        const credential_details = await credential.findOne({            credential_ID: filter['credential_ID']});
        
        return credential_details;
    } catch (error) {
        throw error
    }
}


export const getAllCredentials = async function(filter: Partial<Pick<ICredentials,'credential_ID'>>): Promise < null | ICredentials[]>{
    try {
        const credential_details = await credential.find({}).lean();
        
        return credential_details;
    } catch (error) {
        throw error
    }
}


export const deleteCredentials = async function(filter: Partial<Pick<ICredentials,'credential_ID'>>): Promise < null | ICredentials>{
    try {
        const credential_details = await credential.findOneAndDelete({credential_ID: filter['credential_ID']}).lean();
        
        return credential_details;
    } catch (error) {
        throw error
    }
}

export const UploadImage = async function (
    file: Buffer,
    filename: string,
    folder: string,
  ): Promise<{ secure_url: string }> {
    try {
        const base64 = file.toString("base64")
        const url = await cloudinary.uploader.upload(`data:image/png;base64,${base64}`, {
        public_id: filename,
        folder,
        overwrite: true,
      });
      console.log(url);
      return url;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };