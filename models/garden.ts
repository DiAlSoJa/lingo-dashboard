import mongoose, { Schema, Document } from 'mongoose';


interface IGarden extends Document {
  userId: string;
  name: string;
}

const gardenSchema: Schema<IGarden> = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
});

const Garden: mongoose.Model<IGarden> = mongoose.models.Garden || mongoose.model<IGarden>('Garden', gardenSchema);
export default Garden;