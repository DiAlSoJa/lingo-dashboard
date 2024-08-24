import mongoose, { Schema, Document } from 'mongoose';

interface ICourse extends Document {
  title: string;
  description: string;
  levels: mongoose.Types.ObjectId[];
}

const courseSchema: Schema<ICourse> = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  levels: [{ type: Schema.Types.ObjectId, ref: 'Level' }]
});

const Course: mongoose.Model<ICourse> = mongoose.models.Course || mongoose.model<ICourse>('Course', courseSchema);
export default Course;