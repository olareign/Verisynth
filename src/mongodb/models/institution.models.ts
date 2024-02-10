import mongoose, { Schema, Document, Model } from 'mongoose';
import { uuid } from '../../utils/hashing.modules'; // Assuming the correct export from hashing.modules

export interface ISchool extends Document {
  institution_ID: string;
  institution_name: string;
  email: string;
  password: string;
  role: string;
  resetpin: number;
  amount_of_awarded_credentials: number;
  amount_of_organization_profile: number;
  createdAt: string;
  updatedAt: string;
}

const SchoolSchema = new Schema<ISchool>({
  institution_ID: {
    type: String,
    required: true,
    default: `school-${uuid().replace(/-/g, "")}`,
  },
  institution_name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: 'Issuer',
  },
  resetpin: {
    type: Number,
    required: false,
  },
  amount_of_awarded_credentials: {
    type: Number,
    require: true,
    default: 0
  },
  amount_of_organization_profile: {
    type: Number,
    require: true,
    default: 0
  }
}, {
  timestamps: true
});

export const School = mongoose.model<ISchool>("School", SchoolSchema);