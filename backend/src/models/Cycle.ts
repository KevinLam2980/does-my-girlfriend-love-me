import mongoose, { Schema, Document } from 'mongoose';

export interface ICycle extends Document {
  userId: mongoose.Types.ObjectId;
  startDate: Date;
  periodLength: number;
  createdAt: Date;
  updatedAt: Date;
}

const CycleSchema = new Schema<ICycle>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  startDate: {
    type: Date,
    required: true
  },
  periodLength: {
    type: Number,
    required: true,
    min: 1,
    max: 100
  }
}, {
  timestamps: true
});

// Compound index for efficient queries
CycleSchema.index({ userId: 1, startDate: -1 });

export default mongoose.model<ICycle>('Cycle', CycleSchema); 