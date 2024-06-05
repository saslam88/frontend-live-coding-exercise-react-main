import React, { Component } from "react";
import { questions } from "./questions";

class App extends Component {
  state = {
    answers: Array(Object.keys(questions).length).fill(null),
    score: null,
    averageScore: null
  };

  componentDidMount() {
    const allScores = JSON.parse(localStorage.getItem('scores')) || [];
    if (allScores.length > 0) {
      const totalScore = allScores.reduce((acc, curr) => acc + curr, 0);
      const avgScore = totalScore / allScores.length;
      this.setState({ averageScore: avgScore });
    }
  }

  handleAnswerChange = (index, answer) => {
    const newAnswers = [...this.state.answers];
    newAnswers[index] = answer;
    this.setState({ answers: newAnswers });
  };

  calculateScore = () => {
    const yesCount = this.state.answers.filter(answer => answer === true).length;
    const newScore = (100 * yesCount) / Object.keys(questions).length;
    this.setState({ score: newScore });

    const allScores = JSON.parse(localStorage.getItem('scores')) || [];
    allScores.push(newScore);
    localStorage.setItem('scores', JSON.stringify(allScores));

    const totalScore = allScores.reduce((acc, curr) => acc + curr, 0);
    const avgScore = totalScore / allScores.length;
    this.setState({ averageScore: avgScore });
  };

  render() {
    return (
      <div className="main__wrap">
        <main className="container">
          <h1>Questionnaire</h1>
          {Object.keys(questions).map((key, index) => (
            <div key={key}>
              <p>{questions[key]}</p>
              <button onClick={() => this.handleAnswerChange(index, true)}>Yes</button>
              <button onClick={() => this.handleAnswerChange(index, false)}>No</button>
            </div>
          ))}
          <button onClick={this.calculateScore}>Submit</button>
          {this.state.score !== null && (
            <div>
              <p>Your Score: {this.state.score}</p>
            </div>
          )}
          {this.state.averageScore !== null && (
            <div>
              <p>Average Score: {this.state.averageScore}</p>
            </div>
          )}
        </main>
      </div>
    );
  }
}

export default App;
