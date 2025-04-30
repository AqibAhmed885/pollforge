import Poll from "../model/Poll.js";

export const createPoll = async (req, res) => {
  const { title, description, options } = req.body;

  if (!title || !description || !options || options.length === 0) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const poll = new Poll({
      title,
      description,
      options: options.map((option) => ({ option, votes: 0 })),
    });

    await poll.save();
    res.status(201).json(poll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}