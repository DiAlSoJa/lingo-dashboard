import mongoose, { Schema, Document } from 'mongoose';


interface IPlantUser extends Document {
  gardenId: mongoose.Types.ObjectId;
  name: string;
  position: number;
  level:number;
  userId:string;
}

const plantSchema: Schema<IPlantUser> = new Schema({
  userId:{type:String,required:true},
  gardenId: { type: Schema.Types.ObjectId, ref: 'Garden', required: true },
  name: { type: String, required: true },
  level: { type: Number, required: true },
  position: { type: Number, required: true },
});

const Plant: mongoose.Model<IPlantUser> = mongoose.models.Plant || mongoose.model<IPlantUser>('Plant', plantSchema);
export default Plant;