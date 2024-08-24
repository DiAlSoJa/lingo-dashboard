import mongoose, { Schema, Document } from 'mongoose';

interface ICourse extends Document {
  title: string;
  description: string;
  languageId: mongoose.Types.ObjectId;
}

const courseSchema: Schema<ICourse> = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  languageId: { type: Schema.Types.ObjectId, ref: 'Language' }
});

const Course: mongoose.Model<ICourse> = mongoose.models.Course || mongoose.model<ICourse>('Course', courseSchema);
export default Course;