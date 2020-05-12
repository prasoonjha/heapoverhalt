import "./App.scss";

import { Link, Router } from "@reach/router";
import React, { Component } from "react";

import AskQuestion from "../ask-question/AskQuestion";
import Question from "../question/Question";
import Questions from "../questions/Questions";

class App extends Component {
  constructor(props) {
    super(props);

    this.API_URL = process.env.REACT_APP_API_URL;
    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    this.getQuestions().then((questions) => this.setState({ questions }));
  }

  async getQuestions() {
    const response = await fetch(`${this.API_URL}/question`);

    return response.json();
  }

  async getQuestion(id) {
    const response = await fetch(`${this.API_URL}/question/${id}`);

    return response.json();
  }

  async getAnswers(questionId) {
    const response = await fetch(
      `${this.API_URL}/question/${questionId}/answer`
    );

    return response.json();
  }

  async postQuestion(title, content) {
    const response = await fetch(`${this.API_URL}/question`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ title, content }),
    });

    const newQuestion = await response.json();

    this.setState((state) => {
      return { questions: [...state.questions, newQuestion] };
    });

    return newQuestion;
  }

  async postAnswer(questionId, content) {
    const response = await fetch(
      `${this.API_URL}/question/${questionId}/answer`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({ content }),
      }
    );

    return response.json();
  }

  async handleVote(direction, questionId, answerId) {
    const action = direction === "up" ? "upvote" : "downvote";
    const response = await fetch(
      `${this.API_URL}/question/${questionId}/answer/${answerId}/${action}`,
      {
        method: "PUT",
      }
    );

    return response.json();
  }

  render() {
    const { questions } = this.state;

    return (
      <>
        <h1>heapoverhalt</h1>
        <nav>
          <Link to="/">Questions</Link>
          <br />
          <Link to="/ask-question">Ask a question</Link>
        </nav>
        <Router>
          <Questions path="/" questions={questions} />
          <Question
            path="/question/:id"
            getQuestion={(id) => this.getQuestion(id)}
            getAnswers={(id) => this.getAnswers(id)}
            postAnswer={(questionId, content) => {
              return this.postAnswer(questionId, content);
            }}
            handleVote={(direction, questionId, answerId) => {
              return this.handleVote(direction, questionId, answerId);
            }}
          />
          <AskQuestion
            path="/ask-question"
            postQuestion={(title, content) => {
              this.postQuestion(title, content);
            }}
          />
        </Router>
      </>
    );
  }
}

export default App;
