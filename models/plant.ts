import mongoose, { Schema, Document } from 'mongoose';


interface IPlant extends Document {
  name: string;
  basePrice: number;
  src:string;
  imageId:string;
}


const plantSchema: Schema<IPlant> = new Schema({
 
  name: { type: String, required: true },
  basePrice: { type: Number, required: true },
  src:{type:String, required:true},
  imageId:{type:String,required:true}
});

const Plant: mongoose.Model<IPlant> = mongoose.models.Plant || mongoose.model<IPlant>('Plant', plantSchema);
export default Plant;