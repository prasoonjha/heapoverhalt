import "./Question.scss";

import PropTypes from "prop-types";
import React from "react";

import PostAnswer from "../post-answer/PostAnswer";

export default class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
      answers: [],
    };
  }

  componentDidMount() {
    const { getQuestion, id } = this.props;

    getQuestion(id).then((question) => this.setState({ question }));
    this.fetchAnswers();
  }

  /**
   * Used as a callback in `PostAnswer.js` –similar to what I'd normally use `@Output() EventEmitter` in Angular for.
   */
  onAnswerPosted() {
    this.fetchAnswers();
  }

  async onVote(direction, questionId, answerId) {
    const { handleVote } = this.props;

    // handleVote returns the updated answer
    const updatedAnswer = await handleVote(direction, questionId, answerId);

    // Update votes count in local state
    this.setState((state) => {
      const updatedAnswers = [...state.answers];
      const answer = updatedAnswers.find((a) => a._id === answerId);

      answer.votes = updatedAnswer.votes;

      return { answers: updatedAnswers };
    });
  }

  /**
   * Fetch fresh answers from the API
   */
  fetchAnswers() {
    const { getAnswers, id } = this.props;
    getAnswers(id).then((answers) => this.setState({ answers }));
  }

  render() {
    const { postAnswer } = this.props;
    const { question, answers } = this.state;
    let mappedAnswers = [];

    if (answers.length) {
      mappedAnswers = answers.map((answer) => {
        return (
          <article className="answer" key={answer._id}>
            <h3>
              <span className="answer__created-at">
                {new Date(answer.createdAt).toLocaleDateString()}
              </span>
            </h3>
            <div className="answer__body">
              <div className="vote">
                <button
                  onClick={() => {
                    this.onVote("up", question._id, answer._id);
                  }}
                  className="vote__up"
                  type="button"
                >
                  &uarr;
                </button>
                <button
                  onClick={() => {
                    this.onVote("down", question._id, answer._id);
                  }}
                  className="vote__down"
                  type="button"
                >
                  &darr;
                </button>
                <span className="vote__count">{answer.votes}</span>
              </div>
              <p>{answer.content}</p>
            </div>
          </article>
        );
      });
    }

    return (
      <article>
        {question ? (
          <>
            <h1>{question.title}</h1>
            <p>{question.content}</p>
            <hr />
            <h2>Answers</h2>
            {mappedAnswers}
            <hr />
            <PostAnswer
              questionId={question._id}
              postAnswer={(questionId, content) => {
                return postAnswer(questionId, content);
              }}
              onAnswerPosted={() => this.onAnswerPosted()}
            />
          </>
        ) : (
          <>
            <p>Loading...</p>
          </>
        )}
      </article>
    );
  }
}

Question.propTypes = {
  id: PropTypes.string,
  handleVote: PropTypes.func.isRequired,
  postAnswer: PropTypes.func.isRequired,
  getQuestion: PropTypes.func.isRequired,
  getAnswers: PropTypes.func.isRequired,
};

Question.defaultProps = {
  id: "foo",
};
