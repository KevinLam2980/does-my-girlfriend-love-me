import express, { Request, Response } from 'express';
import auth from '../middleware/auth';
import Event from '../models/Event';

const router = express.Router();

// Helper function to transform MongoDB document to frontend format
const transformEvent = (event: any) => ({
  id: event._id.toString(),
  date: event.date,
  type: event.type,
  notes: event.notes,
  createdAt: event.createdAt,
  updatedAt: event.updatedAt
});

// Helper function to handle date without timezone issues
const parseDateWithoutTimezone = (dateString: string): Date => {
  // Create date in local timezone by setting time to noon
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day, 12, 0, 0, 0);
};

// Get all events for the authenticated user
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const events = await Event.find({ userId: user.id }).sort({ date: -1 });
    const transformedEvents = events.map(transformEvent);
    res.json(transformedEvents);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new event
router.post('/', auth, async (req: Request, res: Response) => {
  try {
    const { date, type, notes } = req.body;
    const user = (req as any).user;

    if (!date || !type) {
      return res.status(400).json({ message: 'Date and type are required' });
    }

    if (!['nice', 'mean', 'argument', 'gift', 'food'].includes(type)) {
      return res.status(400).json({ message: 'Invalid event type' });
    }

    // Parse date without timezone issues
    const parsedDate = parseDateWithoutTimezone(date);

    const event = new Event({
      userId: user.id,
      date: parsedDate,
      type,
      notes
    });

    const savedEvent = await event.save();
    res.status(201).json(transformEvent(savedEvent));
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update an event
router.put('/:id', auth, async (req: Request, res: Response) => {
  try {
    const { date, type, notes } = req.body;
    const eventId = req.params.id;
    const user = (req as any).user;

    const event = await Event.findOne({ _id: eventId, userId: user.id });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (date) {
      // Parse date without timezone issues
      event.date = parseDateWithoutTimezone(date);
    }
    if (type) {
      if (!['nice', 'mean', 'argument', 'gift', 'food'].includes(type)) {
        return res.status(400).json({ message: 'Invalid event type' });
      }
      event.type = type;
    }
    if (notes !== undefined) event.notes = notes;

    const updatedEvent = await event.save();
    res.json(transformEvent(updatedEvent));
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete an event
router.delete('/:id', auth, async (req: Request, res: Response) => {
  try {
    const eventId = req.params.id;
    const user = (req as any).user;

    const event = await Event.findOneAndDelete({ _id: eventId, userId: user.id });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 