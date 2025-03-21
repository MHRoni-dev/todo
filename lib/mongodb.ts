import mongoose from 'mongoose';

export const connectDB = async () => {
  const { MONGODB_URI } = process.env;

  if(!MONGODB_URI) {
    throw new Error('MongoDB URI is missing');
  }

  if(mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI , {
      dbName: 'TODO',
      appName: 'TODO',
    });
    console.log('MongoDB Connected')
  } catch (error) {
    console.error("MOngoDB Connection Error", error)
  }
}
