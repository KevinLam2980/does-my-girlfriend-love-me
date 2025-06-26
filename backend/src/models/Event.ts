import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  userId: mongoose.Types.ObjectId;
  date: Date;
  type: 'nice' | 'mean' | 'argument' | 'gift' | 'food';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    enum: ['nice', 'mean', 'argument', 'gift', 'food'],
    required: true
  },
  notes: {
    type: String,
    maxlength: 500
  }
}, {
  timestamps: true
});

// Compound index for efficient queries
EventSchema.index({ userId: 1, date: -1 });

export default mongoose.model<IEvent>('Event', EventSchema); 