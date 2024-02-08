import mongoose, { Connection } from "mongoose";

const connectDB = async (uri: string): Promise<Connection> => {
    try {
        const connection = await mongoose.connect(uri);
        console.log("MongoDB connected");
        return connection.connection; 
    } catch(error) {
        console.error('MongoDB connection error:', error)
        throw error;
    }
};

export default connectDB;