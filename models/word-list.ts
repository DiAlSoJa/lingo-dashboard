import mongoose, { Schema, Document } from 'mongoose';

interface IWordList extends Document {
  wordId: mongoose.Types.ObjectId;
  listId: mongoose.Types.ObjectId;
}

const wordListSchema: Schema<IWordList> = new Schema({
  wordId: { type: Schema.Types.ObjectId, ref: 'Word', required: true },
  listId: { type: Schema.Types.ObjectId, ref: 'List', required: true },
});

const WordList: mongoose.Model<IWordList> = mongoose.models.WordList || mongoose.model<IWordList>('WordList', wordListSchema);
export default WordList;