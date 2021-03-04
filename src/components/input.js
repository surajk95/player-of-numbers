import React from 'react';

class Input extends React.Component {
    state = {
        word: ''
    }

    handleChange = (event) => {
        if(!event.target.value.includes(' '))
            this.setState({ word: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.word.trim() !== '') {
            this.props.addWord(this.state.word);
            this.setState({ word: '' });
        }
    }

    render () {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <input
                        placeholder="Start typing here"
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