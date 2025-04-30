import mongoose from "mongoose";

const votesTempSchema = new mongoose.Schema({
  poll_id: {
    type: String,
    required: true,
  },
  option_id: {
    type: String,
    required: true,
  },
  user_agent: {
    type: String,
    required: true,
  },
  vote_hash: {
    type: String,
    required: true,
    unique: true, // Prevent duplicate votes based on hash
  },
  synced_at: {
    type: Date,
    default: null,
  },
},
{
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

const VotesTemp = mongoose.model("VotesTemp", votesTempSchema);
export default VotesTemp;
