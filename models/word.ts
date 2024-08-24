import mongoose, { Schema, Document } from 'mongoose';

interface IWord extends Document {
  title: string;
  typeId?: mongoose.Types.ObjectId;
  languageId: mongoose.Types.ObjectId;
}

const wordSchema: Schema<IWord> = new Schema({
  title: { type: String, required: true },
  typeId: { type: Schema.Types.ObjectId, ref: 'WordType', required: false },
  languageId: { type: Schema.Types.ObjectId, ref: 'Language', required: true },
});

const Word: mongoose.Model<IWord> = mongoose.models.Word || mongoose.model<IWord>('Word', wordSchema);
export default Word;