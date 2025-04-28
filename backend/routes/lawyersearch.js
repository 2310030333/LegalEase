import express from 'express';
const router = express.Router();
import User from '../models/User.js';

router.get('/search', async (req, res) => {
  let { name, address, specialization } = req.query;

  try {
    const conditions = [{ role: 'lawyer' }];

    if (typeof name === 'string' && name.trim().length > 0) {
      conditions.push({ fullName: { $regex: name.trim(), $options: 'i' } });
    }

    if (typeof address === 'string' && address.trim().length > 0) {
      conditions.push({ address: { $regex: address.trim(), $options: 'i' } });
    }

    if (typeof specialization === 'string' && specialization.trim().length > 0) {
      conditions.push({ specialization: { $regex: specialization.trim(), $options: 'i' } });
    }

    const query = conditions.length > 1 ? { $and: conditions } : conditions[0];

    const lawyers = await User.find(query);
    res.json(lawyers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while searching lawyers' });
  }
});

export default router;
