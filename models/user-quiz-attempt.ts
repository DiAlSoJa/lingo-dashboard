import mongoose, { Schema, Document } from 'mongoose';


interface IUserQuizAttempt extends Document {
  userId: string;
  quizId: mongoose.Types.ObjectId;
  score: number;
  attemptDate: Date;
}

const userQuizAttemptSchema: Schema<IUserQuizAttempt> = new Schema({
  userId: { type: String, required: true },
  quizId: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
  score: { type: Number, default: 0 },
  attemptDate: { type: Date, default: Date.now },
});

const UserQuizAttempt: mongoose.Model<IUserQuizAttempt> = mongoose.models.UserQuizAttempt || mongoose.model<IUserQuizAttempt>('UserQuizAttempt', userQuizAttemptSchema);
export default UserQuizAttempt;