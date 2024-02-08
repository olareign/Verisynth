import { Schema, model, Document, Types } from 'mongoose';
import { uuid } from '../../utils/hashing.modules';

// Define the document interface
interface IStudent extends Document {
  userId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  password: string;
  role: string;
  resetPin: number | undefined;
  resetPinUsed: boolean;
}

// Create the schema
const studentSchema = new Schema<IStudent>({
  userId: {
    type: String,
    required: true,
    default: uuid()
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true,
    default: function (this: IStudent) {
      return `${this.firstName} ${this.lastName}`;
    }
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
    default: 'student'
  },
  resetPin: {
    type: Number
  },
  resetPinUsed: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
});

// Create and export the model
export const Student = model<IStudent>('Student', studentSchema);
