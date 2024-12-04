import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./AllProblems.css";

const AllProblemsPage = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch problems from the backend
  const fetchProblems = async () => {
    try {
      const response = await fetch("http://localhost:3000/problems"); // Update with your actual backend endpoint
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setProblems(data.problems); // Ensure your backend returns a `problems` array
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect to fetch data on component mount
  useEffect(() => {
    fetchProblems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div id="allproblems">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Difficulty</th>
            <th>Acceptance</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((prob, index) => (
            <tr key={index}>
              <td>
                <Link to={`/problems/${prob.problemId}`}>
                  {prob.title}
                </Link>
              </td>
              <td className={`${prob.difficulty}`}>
                {prob.difficulty}
              </td>
              <td className={`${prob.difficulty}`}>
                {prob.acceptance}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllProblemsPage;
