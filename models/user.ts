import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  points: number;
  hearts: number;
  imageSrc: string;
  createdDate?: Date;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  hearts: {
    type: Number,
    default: 5,
  },
  imageSrc: {
    type: String,
    default: '',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.toJSON = function () {
  const { password, _id, __v, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;