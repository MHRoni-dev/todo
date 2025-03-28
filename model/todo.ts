import mongoose, {Schema, Document} from 'mongoose';

export interface ITODO extends Document {
  user: Schema.Types.ObjectId;
  title : string;
  completed: boolean;
  order: number;
}

const todoSchema = new Schema<ITODO>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true, versionKey: false });

export default mongoose.models.Todo || mongoose.model<ITODO>('Todo', todoSchema);