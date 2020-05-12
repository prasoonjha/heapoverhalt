import './Questions.scss';

import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';

export default class Questions extends React.Component {
    render() {
        const { questions } = this.props;

        const mappedQuestions = questions.map((question) => (
            <article id={question._id} key={question._id}>
                <Link to={`/question/${question._id}`}>
                    <h2>{question.title}</h2>
                </Link>
                <p>{question.content}</p>
            </article>
        ));

        return <>{mappedQuestions}</>;
    }
}

Questions.propTypes = {
    questions: PropTypes.arrayOf(PropTypes.object).isRequired
};
