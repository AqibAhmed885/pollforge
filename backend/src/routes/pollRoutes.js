import express from 'express';
import { createPoll } from '../controller/pollController.js';
import e from 'express';
import { voteOnPoll } from '../controller/voteController.js';

const router = express.Router();

router.post('/', createPoll)
router.post(':/pollId/vote', voteOnPoll)

//get poll results 
router.get('/:pollId/results', async (req, res) => {
  const { pollId } = req.params;

  try {
    const poll = await Poll.findById(pollId);
    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    res.json(poll.options);
  } catch (error) {
    console.error('❌ Error fetching poll results:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

