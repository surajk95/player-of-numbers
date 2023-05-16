import React from 'react';

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            word: '',
            score: -1
        }
    }
    

    resetScore() {
        console.log("reset")
        this.setState({score: this.props.score})
     }

    handleChange = (event) => {
        const value = event.target.value;
        if(this.props.score!==this.state.score)
            this.props.validateAnswer(value, true)
        this.setState({ word: value })
    }

    handleSubmit = (event) => {
        if(event) event.preventDefault();
        if(this.state.word.trim() !== '') {
            this.props.validateAnswer(this.state.word);
            this.setState({ word: '' });
        }
    }

    render () {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <div>
                    <input
                        value={this.state.word}
                        onChange={this.handleChange}
                        autoFocus
                    />
                    </div>
                </form>
            </>
        )
    }  
}

export default Input;