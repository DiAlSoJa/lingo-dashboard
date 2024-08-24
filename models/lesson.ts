import mongoose, { Schema, Document } from 'mongoose';

interface ILesson extends Document {
  title: string;
  lessonParts: mongoose.Types.ObjectId[];
}

const lessonSchema: Schema<ILesson> = new Schema({
  title: { type: String, required: true },
  lessonParts: [{ type: Schema.Types.ObjectId, ref: 'LessonPart' }]
});

const Lesson: mongoose.Model<ILesson> = mongoose.models.Lesson || mongoose.model<ILesson>('Lesson', lessonSchema);
export default Lesson;