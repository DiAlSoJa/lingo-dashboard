import mongoose, { Schema, Document } from 'mongoose';

interface IChapter extends Document {
  title: string;
  lessons: mongoose.Types.ObjectId[];
}

const chapterSchema: Schema<IChapter> = new Schema({
  title: { type: String, required: true },
  lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }]
});

const Chapter: mongoose.Model<IChapter> = mongoose.models.Chapter || mongoose.model<IChapter>('Chapter', chapterSchema);
export default Chapter;
