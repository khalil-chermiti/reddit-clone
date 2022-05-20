import mongoose from "mongoose";
const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

mongoose.connection.once("open", () =>
  console.log("connected to the database...")
);
mongoose.connection.once("error", () =>
  console.error("error connecting to the DB!")
);

export default connectDB;
