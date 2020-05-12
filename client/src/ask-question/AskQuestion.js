import PropTypes from 'prop-types';
import React from 'react';

export default class AskQuestion extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: '',
            message: ''
        };
    }

    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    }

    handleContentChange(event) {
        this.setState({ content: event.target.value });
    }

    handleSubmit(event) {
        const { title, content } = this.state;
        const { postQuestion } = this.props;

        event.preventDefault();
        postQuestion(title, content);

        this.setState({
            title: '',
            content: '',
            message: 'Posted, the question has been.'
        });
    }

    render() {
        const { title, content, message } = this.state;
        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <br />
                    <input
                        name="title"
                        value={title}
                        onChange={(e) => this.handleTitleChange(e)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <br />
                    <textarea
                        name="content"
                        value={content}
                        onChange={(e) => this.handleContentChange(e)}
                    />
                </div>
                <button type="submit">Send it</button>
                {message}
            </form>
        );
    }
}

AskQuestion.propTypes = {
    postQuestion: PropTypes.func.isRequired
};
