import bcrypt from "bcryptjs";

const compareValue = async (candidateValue:string, otp: string ): Promise<boolean> => {
    return await bcrypt.compare(candidateValue, otp)
}

export default compareValue;