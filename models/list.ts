import mongoose, { Schema, Document } from 'mongoose';

interface IList extends Document {
  name: string;
  languageId: mongoose.Types.ObjectId;
}

const listSchema: Schema<IList> = new Schema({
  name: { type: String, required: true },
  languageId: { type: Schema.Types.ObjectId, ref: 'Language', required: true },
});

const List: mongoose.Model<IList> = mongoose.models.List || mongoose.model<IList>('List', listSchema);
export default List;
