import mongoose, { Schema } from 'mongoose';

interface IUser extends Document{
  username: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
})

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema)