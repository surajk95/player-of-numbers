import React from 'react';
import createDictionary from 'dictionary-trie'
import words from './words_dictionary.json';

import Input from './components/input';
import Score from './components/score';

import './App.scss';

class App extends React.Component {
  state = {
    errorMessage: '',
    error: false,
    words: [],
    score :0,
    suffix: 'tion',
    suffixes: [
      'tion',
      'sion',
      'ous',
      'er',
      'ment',
    ],
    startTime: new Date(),
    speed: 0
  }

  componentDidMount() {
    import(`./words_dictionary.json`)
    .then(( Dictionary ) => {
      let dictionary = Dictionary.default;
      let words = [];
      for(let item in dictionary) {
        words.push(item);
      }
      this.setState({ trie: createDictionary(words) });
      //console.log(`dictionary`, words[100]);
    });
  }

  resetState = () => {
    this.setState({
      score: 0,
      speed: 0,
      words: [],
      error: false,
      errorMessage: ''
    });
  }
  changeSuffix = (value) => {
    this.setState({ suffix: value });
    this.resetState();
  }

  addWord = (word) => {
    //console.log(this.state.trie);
    if(!word.toLowerCase().endsWith(this.state.suffix)) {
      this.setState({ error: true, errorMessage: `Word does not end with ${this.state.suffix}`});
    }
    else if(this.state.words.includes(word)) {
      this.setState({ error: true, errorMessage: `You have already entered that.`});
    }
    else if(!this.state.trie.includes(word)) {
      this.setState({ error: true, errorMessage: `Not an English word.`});
    }
    else {
      if(this.state.score === 0)
        this.startTimer();
      else
        this.endTimer();
      this.setState({ error: false, score: this.state.score+1, words: [...this.state.words, word]});
    }
  }

  startTimer = () => {
    this.setState({ startTime: new Date() });
  };
  
  endTimer = () => {
    if(this.state.score === 0)
      return; 
    let endTime = new Date();
    var timeDiff = endTime - this.state.startTime; //in ms
    //Strip the ms, convert to minutes.
    timeDiff /= 1000*60;
    let speed = Math.round(this.state.score/timeDiff, 3);
    //console.log(speed);
    this.setState({ speed });
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          PLAYER OF WORDS
        </div>
        <div className="mode">
          <div className="item" title="future release">single player</div>
          <div className="item active">zen</div>
          <div className="item multi" title="future release">multiplayer</div>
        </div>
        <div className="subtitle">
          <div className="suffix">
          Enter words ending with&nbsp;&nbsp;
            {
              this.state.suffixes.map((item, index) => {
                return (
                <span key={index} className={this.state.suffix===item ? 'activeSuffix' : ''}>
                  <input
                    type="radio"
                    name="suffix"
                    checked={this.state.suffix==item}
                    onChange={()=>this.changeSuffix(item)}
                  />
                  {item}
                </span>
              )})
            }

          </div>
        </div>
        <button className="reset" onClick={this.resetState}>
          Reset
        </button>
        <Input addWord={this.addWord} />
        <div className="errorMessage">
          {
            this.state.error &&
            this.state.errorMessage
          }
         </div>
        <Score
          score={this.state.score}
          speed={this.state.speed}
        />
      </div>
    );
  }
}

export default App;
