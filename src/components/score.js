import React from 'react';

export default function Score(props) {
    return (
        <div className="scoreContainer">
            <div className="speed">
                {props.speed}
                <div className="passive">calculations per minute</div> 
            </div>
            <div className="score">
                <div className="val">
                    {props.score} 
                </div>
                <div className="passive">score</div>
            </div>
        </div>
    )
}