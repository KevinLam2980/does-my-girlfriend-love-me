import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  userId: mongoose.Types.ObjectId;
  defaultCycleData: {
    averagePeriodLength: number;
    averageCycleLength: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
    index: true
  },
  defaultCycleData: {
    averagePeriodLength: {
      type: Number,
      default: 28,
      min: 1,
      max: 100
    },
    averageCycleLength: {
      type: Number,
      default: 28,
      min: 1,
      max: 100
    }
  }
}, {
  timestamps: true
});

export default mongoose.model<ISettings>('Settings', SettingsSchema); 