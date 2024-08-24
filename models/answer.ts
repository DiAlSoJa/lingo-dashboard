import mongoose, { Schema, Document } from 'mongoose';


interface IAnswer extends Document {
  questionId: mongoose.Types.ObjectId;
  answerText: string;
  isCorrect: boolean;
  createdAt: Date;
}

const answerSchema: Schema<IAnswer> = new Schema({
  questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  answerText: { type: String, required: true },
  isCorrect: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Answer: mongoose.Model<IAnswer> = mongoose.models.Answer || mongoose.model<IAnswer>('Answer', answerSchema);
export default Answer;