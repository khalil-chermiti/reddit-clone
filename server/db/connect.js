import mongoose from 'mongoose'
const connectDB = async(uri)=>{
    await mongoose.connect(uri);
}

mongoose.connection.once('open' , () => console.log('connected to the database...'));
mongoose.connection.once('error' , () => console.error('error connecting to the DB!')) ;

export default connectDB;