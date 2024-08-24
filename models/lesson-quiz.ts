import mongoose, { Schema, Document } from 'mongoose';

interface ILessonQuiz extends Document {
  title: string;
  content: string;
  questions: mongoose.Types.ObjectId[];
}

const lessonQuizSchema: Schema<ILessonQuiz> = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, // Texto, URL de videos, etc.
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
});

const LessonQuiz: mongoose.Model<ILessonQuiz> = mongoose.models.LessonQuiz || mongoose.model<ILessonQuiz>('LessonQuiz', lessonQuizSchema);
export default LessonQuiz;