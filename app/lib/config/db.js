import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://rakhshak:t4LqSCVDg0BfahbU@cluster0.smfq7.mongodb.net/blog-app');
    console.log("DB connected")
}