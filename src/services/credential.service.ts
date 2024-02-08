import { ICredentials, credential } from "../mongodb/models/credential.models";

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
        },{payload},{new: true});

        return credential_details;
    } catch (error) {
        throw error
    }
}

export const getACredentials = async function(filter: Partial<Pick<ICredentials,'credential_ID'>>, payload: string): Promise < null | ICredentials>{
    try {
        const credential_details = await credential.findOne({            credential_ID: filter['credential_ID']});
        
        return credential_details;
    } catch (error) {
        throw error
    }
}


export const getAllCredentials = async function(filter: Partial<Pick<ICredentials,'credential_ID'>>, payload: string): Promise < null | ICredentials[]>{
    try {
        const credential_details = await credential.find({}).lean();
        
        return credential_details;
    } catch (error) {
        throw error
    }
}


export const deleteCredentials = async function(filter: Partial<Pick<ICredentials,'credential_ID'>>, payload: string): Promise < null | ICredentials>{
    try {
        const credential_details = await credential.findOneAndDelete({credential_ID: filter['credential_ID']}).lean();
        
        return credential_details;
    } catch (error) {
        throw error
    }
}
