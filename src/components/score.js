import React from 'react';

export default function Score(props) {
    return (
        <div className="scoreContainer">
            <span className="speed">
                {props.speed}
            </span>
            &nbsp;<span className="passive">calculations per minute, score: </span>&nbsp; 
            <span className="score passive">
                {props.score} 
            </span>
        </div>
    )
}