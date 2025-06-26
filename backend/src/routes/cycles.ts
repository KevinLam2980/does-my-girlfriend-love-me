import express, { Request, Response } from 'express';
import auth from '../middleware/auth';
import Cycle from '../models/Cycle';

const router = express.Router();

// Helper function to transform MongoDB document to frontend format
const transformCycle = (cycle: any) => ({
  id: cycle._id.toString(),
  startDate: cycle.startDate,
  periodLength: cycle.periodLength,
  createdAt: cycle.createdAt,
  updatedAt: cycle.updatedAt
});

// Helper function to handle date without timezone issues
const parseDateWithoutTimezone = (dateString: string): Date => {
  // Create date in local timezone by setting time to noon
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day, 12, 0, 0, 0);
};

// Get all cycles for the authenticated user
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const cycles = await Cycle.find({ userId: user.id }).sort({ startDate: -1 });
    const transformedCycles = cycles.map(transformCycle);
    res.json(transformedCycles);
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

    // Parse date without timezone issues
    const parsedDate = parseDateWithoutTimezone(startDate);

    const cycle = new Cycle({
      userId: user.id,
      startDate: parsedDate,
      periodLength
    });

    const savedCycle = await cycle.save();
    res.status(201).json(transformCycle(savedCycle));
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

    if (startDate) {
      // Parse date without timezone issues
      cycle.startDate = parseDateWithoutTimezone(startDate);
    }
    if (periodLength) cycle.periodLength = periodLength;

    const updatedCycle = await cycle.save();
    res.json(transformCycle(updatedCycle));
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