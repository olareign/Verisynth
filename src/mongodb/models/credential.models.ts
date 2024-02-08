import mongoose, {Schema, model } from 'mongoose';
import {ISchool} from '../models/institution.models';
import { uuid } from '../../utils/hashing.modules';

// Define the interface for the Certificate document
export interface ICredentials {
  institution_id: string | ISchool;
  credential_ID: string;
  recipient_email: string;
  recipient_ID: string;
  fullname: string;
  degree_name: string;
  awarded_date: string;
  expiration_date: string;
  file_string: string;
}

interface ICRD extends ICredentials, Document {}

// Define the schema
const credentialSchema = new Schema<ICRD>({
  institution_id: {
    type: mongoose.Types.ObjectId,
    ref: 'School',
    required: true
  },
  credential_ID: {
    type: String,
    required: true,
    default: `${uuid().split('-')[0]}`
  },
  recipient_email: {
    type: String,
    required: true,
    index: true
  },
  recipient_ID: {
    type: String,
    required: true,
    index: true
  },
  degree_name: {
    type: String,
    required: true
  },
  awarded_date: {
    type: String,
    required: true
  },
  fullname: {
    type: String,
    required: true,
  },
  expiration_date: {
    type: String,
    required: true
  },
  file_string: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Export the model
export const credential = model<ICRD>('Credential', credentialSchema);
