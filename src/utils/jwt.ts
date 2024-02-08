import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import CustomAPIError from '../errors/index';
dotenv.config()

// Define the environment variable types if they exist

const secret: string = process.env.SECRET || '';
const expiry: string = process.env.EXPIRATION || '2d';

// Define the User interface for type safety
interface User {
  institution_name: string;
  email: string;
  institution_ID: string;
  role: string;
}

const tokenPayload = (user: User): object => {
  return {
    institution_name: user.institution_name,
    institution_ID: user.institution_ID,
    email: user.email,
    role: user.role
  };
};

const createToken = ({ payload }: { payload: object }): string => {

  if (!secret) {
      throw new CustomAPIError.notFoundError('JWT_SECRET environment variable is not defined');
  }
  if (!expiry) {
    throw new CustomAPIError.notFoundError('JWT_EXPIRY environment variable is not defined');
}
  return jwt.sign(payload, secret, {
    expiresIn: expiry,
  });
};

const decodeToken = (token: string): any => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};

export { createToken, decodeToken, tokenPayload };
