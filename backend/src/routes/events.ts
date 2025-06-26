import express, { Request, Response } from 'express';
import auth from '../middleware/auth';
import Event from '../models/Event';

const router = express.Router();

// Get all events for the authenticated user
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const events = await Event.find({ userId: user.id }).sort({ date: -1 });
    res.json(events);
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

    const event = new Event({
      userId: user.id,
      date,
      type,
      notes
    });

    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
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

    if (date) event.date = date;
    if (type) {
      if (!['nice', 'mean', 'argument', 'gift', 'food'].includes(type)) {
        return res.status(400).json({ message: 'Invalid event type' });
      }
      event.type = type;
    }
    if (notes !== undefined) event.notes = notes;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
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