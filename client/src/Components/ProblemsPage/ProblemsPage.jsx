import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProblemsPage.css";

const ProblemsPage = () => {
  const [CodeSeg, setCodeSeg] = useState("");
  const { pid } = useParams();
  const cleanId = pid.substring("/1"); // Ensure PID is processed correctly
  const [problem, setProblem] = useState(null); // Start with null for easier conditional rendering

  // Fetch problem data
  const init = async () => {
    try {
        const response = await fetch(`http://localhost:3000/problems/${cleanId}`, { method: "GET" });
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        const json = await response.json();
        console.log("Response JSON:", json); // Log response data
        setProblem(json.problem);
    } catch (error) {
        console.error("Error fetching problem:", error);
    }
};
console.log("Clean ID from useParams:", cleanId);

  
  useEffect(() => {
    init();
  }, [cleanId]);


  const handleKey = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      const { selectionStart, selectionEnd, value } = event.target;
      const val =
        value.substring(0, selectionStart) +
        "\t" +
        value.substring(selectionEnd);
      event.target.value = val;
      event.target.selectionStart = event.target.selectionEnd =
        selectionStart + 1;
    }
    setCodeSeg(event.target.value); // Corrected from event.value
  };

  return (
    <div>
      {problem ? (
        <div id="problempage" className="flex-row">
          <div className="ques">
            <h1>{problem.title}</h1>
            <h5>Description</h5>
            <p>{problem.description}</p>
            <code>Input: {problem.exampleIn}</code>
            <code>Output: {problem.exampleOut}</code>
          </div>
          <div className="code">
            <h1>Code Here</h1>
            <form className="code-form" method="post" action="/runprogram">
              <textarea
                name="SolvedCode"
                onKeyDown={handleKey}
                value={CodeSeg}
                onChange={(e) => setCodeSeg(e.target.value)} // Track input changes
              ></textarea>
              <button type="submit" id="test">
                TestCode
              </button>
              <button type="submit" id="submit">
                SubmitCode
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div>The searched Question Doesn't exist</div>
      )}
    </div>
  );
};

export default ProblemsPage;
