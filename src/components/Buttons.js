import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

class Buttons extends React.Component{
    constructor(props) {
        super(props);
        this.reset = this.reset.bind(this);
        this.empty = this.empty.bind(this);
    }
    reset(){
        const isRunning = true;
        this.props.toggleActive(isRunning);
        this.props.createGrid();
    }
    empty(){
        const rows = this.props.width;
        const cols = this.props.height;
        const board = [];
        const isRunning = false;

        for (var i=0; i<cols;i++){
        board[i]=[];
        for (var j=0;j<rows;j++){
            board[i][j]={id:j, status: 'dead'}
        }
        this.props.toggleActive(isRunning);
        this.props.updateBoard(board);
    }
    }
    
    render(){
        return (
            <div>
                <Button bsSize="small" bsStyle="warning" onClick={() => this.reset()}><strong>Reset</strong></Button>
                {/*<Button bsSize="small" bsStyle="success"  onClick={() => this.empty()}><strong>Empty</strong></Button>*/}
            </div>
        )
    }
}
Buttons.propTypes = {
    updateBoard: PropTypes.func,
    updateGeneration: PropTypes.func,
    board: PropTypes.array,
    createGrid: PropTypes.func,
    toggleActive: PropTypes.func
};

export default Buttons;