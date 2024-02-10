import { ISchool } from '../../src/mongodb/models/institution.models';
import {institution} from '../../types/custom'
  
declare global {
   namespace Express {
     export interface Request {
       user?: ISchool | institution;
     }
   }
}