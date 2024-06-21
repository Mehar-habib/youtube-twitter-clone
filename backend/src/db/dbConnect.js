import mongoose from "mongoose";
import { DB_NAME } from "../constant";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URL}/${DB_NAME}`
        );
        console.log(
            `\n MONGODB Connected !! DB HOST: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.log("MONGODB connection failed", error);
        process.exit(1);
    }
};

export default connectDB;
