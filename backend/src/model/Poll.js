import mongoose from "mongoose";

const pollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  options: [
    {
      option: {
        type: String,
        required: true,
      },
      votes: {
        type: Number,
        default: 0,
      },
    },
  ],
},
{
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});
const Poll = mongoose.model("Poll", pollSchema);
export default Poll;