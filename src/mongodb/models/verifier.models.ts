import mongoose, { Schema, Document, Model } from 'mongoose';
import { uuid } from '../../utils/hashing.modules';

// Define the Verifier interface
interface IVerifier extends Document {
  verifier_id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  role: string;
  password: string;
  resetPin?: number;
  resetPinUsed: boolean;
}

// Define the Verifier schema
const verifierSchema: Schema = new Schema({
  verifier_id: {
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
    default: function(this: IVerifier) {
      return `${this.firstName} ${this.lastName}`;
    }
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    required: true,
    default: 'verifier'
  },
  password: {
    type: String,
    required: true
  },
  resetPin: {
    type: Number
  },
  resetPinUsed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Create the Verifier model
const Verifier: Model<IVerifier> = mongoose.model<IVerifier>('Verifier', verifierSchema);

// Export the Verifier model
export default Verifier;
