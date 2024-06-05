import React, { useState, useEffect } from "react";
import { questions } from "./questions";

const App = () => {
  const [answers, setAnswers] = useState(Array(Object.keys(questions).length).fill(null));
  const [score, setScore] = useState(null);
  const [averageScore, setAverageScore] = useState(null);

  useEffect(() => {
    const allScores = JSON.parse(localStorage.getItem('scores')) || [];
    if (allScores.length > 0) {
      const totalScore = allScores.reduce((acc, curr) => acc + curr, 0);
      const avgScore = totalScore / allScores.length;
      setAverageScore(avgScore);
    }
  }, []);

  const handleAnswerChange = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    const yesCount = answers.filter(answer => answer === true).length;
    const newScore = (100 * yesCount) / Object.keys(questions).length;
    setScore(newScore);

    const allScores = JSON.parse(localStorage.getItem('scores')) || [];
    allScores.push(newScore);
    localStorage.setItem('scores', JSON.stringify(allScores));

    const totalScore = allScores.reduce((acc, curr) => acc + curr, 0);
    const avgScore = totalScore / allScores.length;
    setAverageScore(avgScore);
  };

  return (
    <div className="main__wrap">
      <main className="container">
        <h1>Questionnaire</h1>
        {Object.keys(questions).map((key, index) => (
          <div key={key}>
            <p>{questions[key]}</p>
            <button onClick={() => handleAnswerChange(index, true)}>Yes</button>
            <button onClick={() => handleAnswerChange(index, false)}>No</button>
          </div>
        ))}
        <button onClick={calculateScore}>Submit</button>
        {score !== null && (
          <div>
            <p>Your Score: {score}</p>
          </div>
        )}
        {averageScore !== null && (
          <div>
            <p>Average Score: {averageScore}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
