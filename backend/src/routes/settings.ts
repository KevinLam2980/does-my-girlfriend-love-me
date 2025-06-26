import express, { Request, Response } from 'express';
import auth from '../middleware/auth';
import Settings from '../models/Settings';

const router = express.Router();

// Get settings for the authenticated user
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    let settings = await Settings.findOne({ userId: user.id });
    
    if (!settings) {
      // Create default settings if none exist
      settings = new Settings({
        userId: user.id,
        defaultCycleData: {
          averagePeriodLength: 28,
          averageCycleLength: 28
        }
      });
      await settings.save();
    }
    
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update settings for the authenticated user
router.put('/', auth, async (req: Request, res: Response) => {
  try {
    const { defaultCycleData } = req.body;
    const user = (req as any).user;

    let settings = await Settings.findOne({ userId: user.id });
    
    if (!settings) {
      settings = new Settings({
        userId: user.id,
        defaultCycleData: {
          averagePeriodLength: 28,
          averageCycleLength: 28
        }
      });
    }

    if (defaultCycleData) {
      if (defaultCycleData.averagePeriodLength) {
        settings.defaultCycleData.averagePeriodLength = defaultCycleData.averagePeriodLength;
      }
      if (defaultCycleData.averageCycleLength) {
        settings.defaultCycleData.averageCycleLength = defaultCycleData.averageCycleLength;
      }
    }

    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 