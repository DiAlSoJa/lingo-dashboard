import mongoose, { Schema, Document } from 'mongoose';

interface ILesson extends Document {
  title: string;
  description:string;
  chapterId: mongoose.Types.ObjectId;
}

const lessonSchema: Schema<ILesson> = new Schema({
  title: { type: String, required: true },
  description:{type:String,required:true},
  chapterId:{type:Schema.Types.ObjectId,ref:"Chapter",required:true}
});

const Lesson: mongoose.Model<ILesson> = mongoose.models.Lesson || mongoose.model<ILesson>('Lesson', lessonSchema);
export default Lesson;