import React from 'react';

class Input extends React.Component {
    state = {
        word: ''
    }

    handleChange = (event) => {
        const value = event.target.value;
        if(isNaN(value) && value!=='-') {
            return;
        }
        this.setState({ word: value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.word.trim() !== '') {
            this.props.validateAnswer(this.state.word);
            this.setState({ word: '' });
        }
    }

    render () {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <input
                        placeholder="Enter your answer here"
                        value={this.state.word}
                        onChange={this.handleChange}
                        autoFocus
                    />
                </form>
            </>
        )
    }  
}

export default Input;