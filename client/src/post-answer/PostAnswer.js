import PropTypes from "prop-types";
import React from "react";

export default class PostAnswer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  handleContentChange(event) {
    this.setState({ content: event.target.value });
  }

  handleSubmit(event) {
    const { questionId, postAnswer, onAnswerPosted } = this.props;
    const { content } = this.state;

    event.preventDefault();

    postAnswer(questionId, content).then(() => {
      this.setState({
        content: "",
      });

      // Callback from `Question.js` –used to fetch new answers upon submit
      onAnswerPosted();
    });
  }

  render() {
    const { content } = this.state;

    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <br />
          <textarea
            name="content"
            value={content}
            onChange={(e) => this.handleContentChange(e)}
          />
        </div>
        <button type="submit">Add answer</button>
      </form>
    );
  }
}

PostAnswer.propTypes = {
  questionId: PropTypes.string.isRequired,
  postAnswer: PropTypes.func.isRequired,
  onAnswerPosted: PropTypes.func.isRequired,
};
