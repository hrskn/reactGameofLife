import React, { Component } from 'react';
import Board from './Board';
import Buttons from './Buttons';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      generation: 0,
      isRunning: true,
      options: {
        width: 50,
        height: 30
      }
    }
    this.updateBoard = this.updateBoard.bind(this);
    this.updateGeneration = this.updateGeneration.bind(this);
    this.createGrid = this.createGrid.bind(this);
    this.randomize = this.randomize.bind(this);
    this.toggleActive = this.toggleActive.bind(this);
  }

  componentWillMount(){
    this.createGrid();
  }

  createGrid(){
    const rows = this.state.options.width;
    const cols = this.state.options.height;
    const board = []

    for (var i=0; i<cols;i++){
      board[i]= [];
      for (var j=0;j<rows;j++){
        board[i][j]={id:j, status: this.randomize()}
      }
    }
    this.setState({
        board:board,
        generation:0
    });
  }
  toggleActive(running){
    this.setState({isRunning:running})
  }

  updateBoard(board,generation){
    this.setState({board:board});
  }
  updateGeneration(){
    let generation = this.state.generation + 1;
    this.setState({generation: generation})
  }
  randomize(){
    let status = [
      'alive',
      'dead'
    ];
    let randomVal = Math.floor(Math.random()*status.length);
    return status[randomVal];
  }


  render() {
    return (
      <div className="App">
        <h1>Game of Life<br/><h4>(React)</h4></h1>
        <span className="info"><i><a href="https://sv.wikipedia.org/wiki/Game_of_Life">(https://sv.wikipedia.org/wiki/Game_of_Life)</a></i></span>
        <h3>Generation: {this.state.generation}</h3>
        <Board 
        width={this.state.options.width} 
        height={this.state.options.height} 
        board={this.state.board} 
        updateBoard={this.updateBoard}
        updateGeneration={this.updateGeneration}
        toggleActive={this.toggleActive}
        isRunning={this.state.isRunning}
        />
        <Buttons 
          width={this.state.options.width} 
          height={this.state.options.height} 
          createGrid={this.createGrid}
          updateBoard={this.updateBoard} board={this.state.board}
          toggleActive={this.toggleActive}
         
         />
      </div>
    );
  }
}

export default App;
