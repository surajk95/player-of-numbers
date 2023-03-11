import React from 'react';

import Input from './components/input';
import Score from './components/score';
import MobileNoAccess from './components/mobile-no-access';

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
      let randGen = 10
      while(randGen>=10) {
        randGen = Math.floor(Math.random()*10)
      }
      x = x*10 + randGen;
      i++;
    }
    i=0;
    while(i<maxLimitY) {
      let randGen = 10
      while(randGen>=10) {
        randGen = Math.floor(Math.random()*10)
      }
      y = y*10 + randGen;
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
    const { solution } = this.state;
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
    timeDiff /= 1000*60;
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
        <MobileNoAccess />
        <div className="splitContainer">
          <div className="screen screen1 subtitle">
            <div className="header">
              PLAYER<br/>OF<br/>NUMBERS
            </div>
            <div className="suffix">
              <div className="options">
              {
                modes.map((item, index) => {
                  return (
                  <div key={index} className={`item ${mode===item ? 'activeMode' : ''}`} onClick={()=>this.changeMode(item)}>
                    {item}
                  </div>
                )})
              }
              </div>
            </div>
            <div className="digits">
              <div>Limit LHS to</div> <input
                      type="text"
                      name="limit"
                      placeholder="Ex. 2"
                      onChange={(e)=>this.changeMax('maxLimitX', e.target.value, mode)}
                      value={maxLimitX}
                      className="limitInput"
              /><span> digits</span>
              <div style={{marginTop: '25px'}}>Limit RHS to</div> <input
                      type="text"
                      name="limit"
                      placeholder="Ex. 1"
                      onChange={(e)=>this.changeMax('maxLimitY', e.target.value, mode)}
                      value={maxLimitY}
                      className="limitInput"
              /><span> digits</span>
            </div>
          </div>
          <div className="screen screen2">
            <div className="mode">
              <div className="item active">{x} {this.getModeSymbol()} {y}</div>
            </div>
            <div className="inputItem">
              <Input validateAnswer={this.validateAnswer} />
              <button className="reset" onClick={()=>this.resetState(mode)}>
                Reset
              </button>
              <div className="errorMessage">
              {
                this.state.error &&
                this.state.errorMessage
              }
              </div>
            </div>
          </div>
          <div className="screen screen3">
            <Score
              score={this.state.score}
              speed={this.state.speed}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
