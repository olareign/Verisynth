import dotenv from 'dotenv'
dotenv.config();

import {School, ISchool} from "../mongodb/models/institution.models";



export const createSchool = async function(payload: any): Promise<ISchool | null>{
    try {
        const school_details: ISchool = await School.create({...payload})
        return school_details;
    } catch (error) {
        throw error;
    }
}

export const getASchool = async function(filter: Partial<Pick<ISchool,'institution_name' | 'email' >>): Promise<ISchool | null>{
    try {
        const schools = await School.findOne({
            institution_name: filter['institution_name'],
            email: filter['email']
        })
        return schools;
    } catch (error) {
        throw error;
    }
}

export const getAllSchool = async function(): Promise<ISchool[] | null>{
    try {
        const schools = await School.find().lean()
        return schools;
    } catch (error) {
        throw error;
    }
}

export const deleteSchool = async function(filter: Partial<Pick<ISchool,'institution_name' | 'email'>>): Promise<ISchool | null>{
    try {
        const schools = await School.findOneAndDelete({
            institution_name: filter['institution_name'],
            email: filter['email']
        })
        return schools;
    } catch (error) {
        throw error;
    }
}

export const updateSchool = async function(filter: Partial<Pick<ISchool,'institution_name' | 'email'>>, payload: any): Promise<ISchool | null>{
    try {
        const schools = await School.findOneAndUpdate({
            institution_name: filter['institution_name'],
            email: filter['email']
        },
        {payload},
        {new: true} //return the new value not the old one
        )
        
        return schools;
    } catch (error) {
        throw error;
    }
}


export const checkDBforPin = async function(payload: any): Promise < null | ISchool>{
    try {
        const school_details = await School.findOne({ email: payload.email, resetpin: payload.resetpin });
        
        return school_details;
    } catch (error) {
        throw error
    }
}