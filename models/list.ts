import mongoose, { Schema, Document } from 'mongoose';

interface IList extends Document {
  name: string;
  languageId: mongoose.Types.ObjectId;
}

 


const List: mongoose.Model<IList> = mongoose.models.List || mongoose.model<IList>('List', listSchema);
export default List;
