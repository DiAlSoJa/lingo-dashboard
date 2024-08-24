
import mongoose, { Schema, Document } from 'mongoose';


interface IQuestion extends Document {
  quizId: mongoose.Types.ObjectId;
  questionText: string;
  createdAt: Date;
}

const questionSchema: Schema<IQuestion> = new Schema({
  quizId: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
  questionText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Question: mongoose.Model<IQuestion> = mongoose.models.Question || mongoose.model<IQuestion>('Question', questionSchema);
export default Question;
