
import crypto from "crypto";
import Poll from "../model/Poll.js";
import VotesTemp from "../model/Vote.js";

// Helper function to generate a unique hash
const generateHash = (userAgent, pollId) => {
  return crypto.createHash('sha256').update(userAgent + pollId).digest('hex');
};

export const voteOnPoll = async (req, res) => {
  const { optionId } = req.body;
  const userAgent = req.get('User-Agent');
  const { pollId } = req.params;

  // Generate a unique hash for the vote
  const voteHash = generateHash(userAgent, pollId);

  try {
    // Check if the poll exists
    const poll = await Poll.findById(pollId);
    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }

    // Check if the option exists in the poll
    const option = poll.options.id(optionId);
    if (!option) {
      return res.status(404).json({ error: "Option not found" });
    }

    // Check for duplicate votes
    const existingVote = await VotesTemp.findOne({ vote_hash: voteHash });
    if (existingVote) {
      console.log(`Conflict detected for hash: ${voteHash}`);
      return res.status(409).json({ error: "Duplicate vote detected" });
    }

    // Increment the vote count for the selected option
    option.votes += 1;
    await poll.save();

    // Save the vote in the VotesTemp collection
    const newVote = await VotesTemp.create({
      poll_id: pollId,
      option_id: optionId,
      user_agent: userAgent,
      vote_hash: voteHash,
    });

    res.json({ success: true, vote: newVote });
  } catch (err) {
    console.error("❌ Error voting on poll:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};