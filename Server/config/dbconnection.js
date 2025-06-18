import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

// Optional: silence Mongoose strictQuery warning (from Mongoose 7)
mongoose.set('strictQuery', true);

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(`${MONGO_URI}/LMS`, {
      
    });

    console.log(`DATABASE CONNECTED Successfully: ${connection.connection.name}`);
  } catch (error) {
    console.error(` DATABASE CONNECTION ERROR: ${error.message}`);
    setTimeout(connectDb, 5000); // retry after 5 seconds
  }
};

export default connectDb;
