import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PollApp = () => {
  const [poll, setPoll] = useState(null);
  const [pollId, setPollId] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [results, setResults] = useState({});
  const [message, setMessage] = useState('');

  // Load poll when pollId is set
  useEffect(() => {
    if (!pollId) return;
    axios.get(`/api/polls/${pollId}`)
      .then(res => setPoll(res.data))
      .catch(() => setMessage('Poll not found'));
  }, [pollId]);

  // Auto-refresh vote counts
  useEffect(() => {
    if (!pollId) return;
    const interval = setInterval(() => {
      axios.get(`/api/poll-count?poll_id=${pollId}`).then(res => {
        setResults(res.data.results);
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [pollId]);

  const handleVote = async () => {
    if (!selectedOption) return alert('Select an option');
    if (localStorage.getItem(`voted-${pollId}`)) {
      return alert('You already voted.');
    }

    try {
      await axios.post('/api/vote', {
        poll_id: pollId,
        choice: selectedOption
      });
      localStorage.setItem(`voted-${pollId}`, 'true');
      setMessage('Vote submitted!');
    } catch (err) {
      setMessage('Duplicate vote or error occurred.', err.message);
    }
  };

  if (!poll) {
    return (
      <div className="p-6">
        <h1 className="text-2xl mb-4">Enter Poll ID</h1>
        <input
          className="border p-2 mr-2"
          placeholder="Poll ID"
          value={pollId}
          onChange={e => setPollId(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2" onClick={() => { }}>Load Poll</button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-lg mx-auto font-sans">
      <h1 className="text-3xl font-bold">{poll.title}</h1>
      <p className="mb-4">{poll.description}</p>

      <div className="mb-4">
        {poll.options.map(option => (
          <label key={option} className="block mb-2">
            <input
              type="radio"
              name="option"
              value={option}
              checked={selectedOption === option}
              onChange={e => setSelectedOption(e.target.value)}
            />
            <span className="ml-2">{option}</span>
          </label>
        ))}
      </div>

      <button
        onClick={handleVote}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Vote
      </button>

      {message && <p className="mt-4 text-blue-600">{message}</p>}

      <h2 className="mt-6 text-xl font-semibold">Live Results</h2>
      <ul className="mt-2">
        {poll.options.map(option => (
          <li key={option}>
            {option}: {results[option] || 0} votes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PollApp;
