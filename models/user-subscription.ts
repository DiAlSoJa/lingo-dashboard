import mongoose, { Schema, Document } from 'mongoose';

interface IUserSubscription extends Document {
  userId: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  stripePriceId: string;
  stripeCurrentPeriodEnd: string;
}

const userSubscriptionSchema: Schema<IUserSubscription> = new Schema({
  userId: { type: String, required: true, unique: true },
  stripeCustomerId: { type: String, required: true, unique: true },
  stripeSubscriptionId: { type: String, required: true, unique: true },
  stripePriceId: { type: String, required: true },
  stripeCurrentPeriodEnd: { type: String, required: true },
});

const UserSubscription: mongoose.Model<IUserSubscription> = mongoose.models.UserSubscription || mongoose.model<IUserSubscription>('UserSubscription', userSubscriptionSchema);
export default UserSubscription;