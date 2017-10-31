import React from 'react';
import Cells from './Cells'
import PropTypes from 'prop-types';

class Board extends React.Component {

    render() {
        return(
            <div>
                <Cells 
                board={this.props.board} 
                updateBoard={this.props.updateBoard}
                updateGeneration={this.props.updateGeneration}
                isRunning={this.props.isRunning}
                toggleActive={this.props.toggleActive}
                />
            </div>
        )
    }

}
Board.propTypes = {
    updateBoard: PropTypes.func,
    updateGeneration: PropTypes.func,
    board: PropTypes.array,
    isRunning: PropTypes.bool,
    toggleActive: PropTypes.func
};

export default Board;