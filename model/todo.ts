import mongoose, {Schema, Document} from 'mongoose';

export interface ITODO extends Document {
  title : string;
  completed: boolean;
  order: number;
}

const todoSchema = new Schema<ITODO>({
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