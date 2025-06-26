import express, { Request, Response } from 'express';
import auth from '../middleware/auth';
import Cycle from '../models/Cycle';

const router = express.Router();

// Get all cycles for the authenticated user
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const cycles = await Cycle.find({ userId: user.id }).sort({ startDate: -1 });
    res.json(cycles);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new cycle
router.post('/', auth, async (req: Request, res: Response) => {
  try {
    const { startDate, periodLength } = req.body;
    const user = (req as any).user;

    if (!startDate || !periodLength) {
      return res.status(400).json({ message: 'Start date and period length are required' });
    }

    const cycle = new Cycle({
      userId: user.id,
      startDate,
      periodLength
    });

    const savedCycle = await cycle.save();
    res.status(201).json(savedCycle);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a cycle
router.put('/:id', auth, async (req: Request, res: Response) => {
  try {
    const { startDate, periodLength } = req.body;
    const cycleId = req.params.id;
    const user = (req as any).user;

    const cycle = await Cycle.findOne({ _id: cycleId, userId: user.id });
    if (!cycle) {
      return res.status(404).json({ message: 'Cycle not found' });
    }

    if (startDate) cycle.startDate = startDate;
    if (periodLength) cycle.periodLength = periodLength;

    const updatedCycle = await cycle.save();
    res.json(updatedCycle);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a cycle
router.delete('/:id', auth, async (req: Request, res: Response) => {
  try {
    const cycleId = req.params.id;
    const user = (req as any).user;

    const cycle = await Cycle.findOneAndDelete({ _id: cycleId, userId: user.id });
    if (!cycle) {
      return res.status(404).json({ message: 'Cycle not found' });
    }

    res.json({ message: 'Cycle deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 