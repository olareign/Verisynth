import mongoose, { Schema, Document, Model } from 'mongoose';
import { uuid } from '../../utils/hashing.modules'; // Assuming the correct export from hashing.modules

export interface ISchool {
  institution_ID: string;
  institution_name: string;
  email: string;
  password: string;
  role: string;
  resetpin: number;
}

interface ISCH extends ISchool, Document {}

const SchoolSchema = new Schema<ISCH>({
  institution_ID: {
    type: String,
    required: true,
    default: `school-${uuid().replace(/-/g, "")}`,
  },
  institution_name: {
    type: String,
    required: true,
    unique: true,
    index: 1
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
  }
}, {
  timestamps: true
});

export const School = mongoose.model<ISCH>("School", SchoolSchema);