import mongoose, { Schema, Document } from 'mongoose';

interface IWordType extends Document {
  name: string;
  languageId: mongoose.Types.ObjectId;
}

const wordTypeSchema: Schema<IWordType> = new Schema({
  name: { type: String, required: true },
  languageId: { type: Schema.Types.ObjectId, ref: 'Language', required: true },  // Asegúrate que el ref coincida con el nombre del modelo
});

const WordType: mongoose.Model<IWordType> = mongoose.models.WordType || mongoose.model<IWordType>('WordType', wordTypeSchema);
export default WordType;