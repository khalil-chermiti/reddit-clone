import mongoose from 'mongoose'
const connectDB = async(uri)=>{
    await mongoose.connect(uri);
    console.log('connected to mongo successfully...');
}

export default connectDB;