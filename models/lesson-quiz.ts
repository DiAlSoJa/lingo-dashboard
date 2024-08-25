import mongoose, { Schema, Document } from 'mongoose';

interface ILessonQuiz extends Document {
  title: string;
  lessonId:mongoose.Types.ObjectId;
}

const lessonQuizSchema: Schema<ILessonQuiz> = new Schema({
  title: { type: String, required: true },
  lessonId:{type:Schema.Types.ObjectId,ref: "Lesson",required:true}
});

const LessonQuiz: mongoose.Model<ILessonQuiz> = mongoose.models.LessonQuiz || mongoose.model<ILessonQuiz>('LessonQuiz', lessonQuizSchema);
export default LessonQuiz;