import mongoose from 'mongoose';

interface ILanguage {
  name: string;
  locale: string;
}

const languageSchema = new mongoose.Schema<ILanguage>({
  name: {
    type: String,
    required: true,
  },
  locale: {
    type: String,
    required: true,
  },
});

const Language: mongoose.Model<ILanguage> = mongoose.models.Language || mongoose.model<ILanguage>('Language', languageSchema);

export default Language;
