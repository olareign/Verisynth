import bcrypt from 'bcryptjs'
import CustomAPIError from '../errors/index'
import { v4 as UUID } from 'uuid'
const hashingModule = async function (valueToHash: string): Promise<string> {
    // hashing the otp
    const saltRound = await bcrypt.genSalt(10)
    const hashedValue = await bcrypt.hash(valueToHash, saltRound)
    if (!hashedValue) {
        throw new CustomAPIError.BadRequestError('Failed to Secure Value');
    }
    return hashedValue;
}

export const comparePasswords = async function (
    password: string,
    hashedPassword: string
    ) : Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword)
}

export const uuid = () => UUID()

export default hashingModule;
