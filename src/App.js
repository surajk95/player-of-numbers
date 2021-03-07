import React from 'react';

import Input from './components/input';
import Score from './components/score';

import './App.scss';

class App extends React.Component {
  state = {
    errorMessage: '',
    error: false,
    words: [],
    score :0,
    modes: ['multiply', 'add', 'subtract'],
    mode: 'multiply',
    x: 0,
    y: 0,
    maxLimitX: 2,
    maxLimitY: 1,
    solution: 0,
    startTime: new Date(),
    speed: 0
  }

  componentDidMount() {
    this.generatePuzzle();
  }

  generatePuzzle = () => {
    const { maxLimitX, maxLimitY, mode } = this.state;
    let i=0, x=0, y=0;
    while(i<maxLimitX) {
      x = x*10 + Math.floor(Math.random()*10);
      i++;
    }
    i=0;
    while(i<maxLimitY) {
      y = y*10 + Math.floor(Math.random()*10);
      i++;
    }
    const solution = mode==='multiply' ? (x*y) : mode==='add' ? (x+y) : (x-y);
    this.setState({ x, y, solution });
  }

  resetState = (mode='multiply') => {
    this.setState({
      score: 0,
      speed: 0,
      words: [],
      mode,
      error: false,
      errorMessage: '',
      solution: -999999,
    }, () => {
      this.generatePuzzle();
    });
  }
  changeMode = (value) => {
    this.resetState(value);
  }

  validateAnswer = (word) => {
    const answer = parseInt(word);
    const { solution, mode } = this.state;
    console.log(`zzz`, answer, solution);
    if(answer !== solution) {
      this.setState({ error: true, errorMessage: `Not the right answer`});
    }
    else {
      if(this.state.score === 0) {
        this.setState({ speed: 1 });
        this.startTimer();
      } 
      else
        this.endTimer();
      this.setState({ error: false, score: this.state.score+1 });
      this.generatePuzzle();
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
    timeDiff /= 1000*60*60;
    let speed = Math.round(this.state.score/timeDiff, 3);
    //console.log(speed);
    this.setState({ speed });
  }

  getModeSymbol = () => {
    const { mode } = this.state;
    switch(mode) {
      case 'multiply':
        return 'x';
      case 'add':
        return '+';
      case 'subtract':
        return '-';
      default:
        return 'x';
    }
  }

  changeMax = (dimension, value, mode) => {
    this.setState({ [dimension]: value }, this.resetState(mode));
  }

  render() {
    const { x, y, maxLimitX, maxLimitY, modes, mode } = this.state;
    return (
      <div className="App">
        <div className="header">
          PLAYER OF NUMBERS
        </div>
        <div className="mode">
          <div className="item active">{x} {this.getModeSymbol()} {y}</div>
        </div>
        <div className="subtitle">
          <div className="suffix">
            {
              modes.map((item, index) => {
                return (
                <span key={index} className={mode===item ? 'activeMode' : ''}>
                  <input
                    type="radio"
                    name="suffix"
                    checked={mode==item}
                    onChange={()=>this.changeMode(item)}
                  />
                  {item}
                </span>
              )})
            }
            <span style={{ marginLeft: '25px'}}>Limit LHS to</span> <input
                    type="text"
                    name="limit"
                    placeholder="Ex. 2"
                    onChange={(e)=>this.changeMax('maxLimitX', e.target.value, mode)}
                    value={maxLimitX}
                    className="limitInput"
                  /><span> digits</span>
            <span style={{ marginLeft: '25px'}}>Limit RHS to</span> <input
                    type="text"
                    name="limit"
                    placeholder="Ex. 1"
                    onChange={(e)=>this.changeMax('maxLimitY', e.target.value, mode)}
                    value={maxLimitY}
                    className="limitInput"
                  /><span> digits</span>
          </div>
        </div>
        <button className="reset" onClick={()=>this.resetState(mode)}>
          Reset
        </button>
        <Input validateAnswer={this.validateAnswer} />
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
