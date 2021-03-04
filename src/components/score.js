import React from 'react';

export default function Score(props) {
    return (
        <div className="scoreContainer">
            <span className="score">
                {props.score}
            </span>
            &nbsp;
            <span className="speed">
                at {props.speed} words per minute
            </span>
        </div>
    )
}