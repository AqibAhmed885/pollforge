import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Poll = ({ pollId }) => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const fetchResults = async () => {
    try {
      const res = await axios.get(`/api/polls/${pollId}/results`);
      setResults(res.data);
    } catch (err) {
      setError('Failed to fetch results');
    }
  };

  const handleVote = async (optionId) => {
    const hasVoted = localStorage.getItem(`voted_${pollId}`);
    if (hasVoted) {
      setError('You already voted!');
      return;
    }

    try {
      await axios.post(`/api/polls/${pollId}/vote`, { optionId });
      localStorage.setItem(`voted_${pollId}`, 'true');
      fetchResults();
    } catch (err) {
      setError(err.response?.data?.error || 'Vote failed');
    }
  };

  useEffect(() => {
    fetchResults();
    const interval = setInterval(fetchResults, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Poll Results</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <ul className="space-y-3">
        {results.map(({ _id, count }) => (
          <li
            key={_id}
            className="flex justify-between items-center p-3 bg-gray-100 rounded-md shadow-sm"
          >
            <span className="font-medium text-gray-700">Option {_id}</span>
            <span className="text-gray-600">{count} votes</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={() => handleVote('option1')}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Vote Option 1
        </button>
        <button
          onClick={() => handleVote('option2')}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Vote Option 2
        </button>
      </div>
    </div>
  );
};

export default Poll;