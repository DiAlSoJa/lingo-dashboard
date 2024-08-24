import mongoose, { Schema, Document } from 'mongoose';


interface IPlantLevel extends Document {
  plantId: mongoose.Types.ObjectId;
  level: number;
  levelPrice: number;
}

const plantLevelSchema: Schema<IPlantLevel> = new Schema({
  plantId: { type: Schema.Types.ObjectId, ref: 'Plant', required: true },
  level: { type: Number, required: true, min: 1, max: 10 },
  levelPrice: { type: Number, required: true },
});

const PlantLevel: mongoose.Model<IPlantLevel> = mongoose.models.PlantLevel || mongoose.model<IPlantLevel>('PlantLevel', plantLevelSchema);
export default PlantLevel;