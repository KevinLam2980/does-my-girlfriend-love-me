import express, { Request, Response } from 'express';
import auth from '../middleware/auth';

const router = express.Router();

// Protected route example - get current user
router.get('/me', auth, (req: Request, res: Response) => {
  const user = (req as any).user;
  res.json({ 
    message: 'Protected route accessed successfully',
    user
  });
});

export default router; 