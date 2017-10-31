import React from 'react';
import PropTypes from 'prop-types';


class Cells extends React.Component {
    constructor(props) {
        super(props);
        this.updateCell = this.updateCell.bind(this);
        this.checkNeighbours = this.checkNeighbours.bind(this);
        this.moveBoard = this.moveBoard.bind(this);
        this.tick = this.tick.bind(this);
        this.state = {
            updatedBoard: []
        }
    }
    updateCell(row, col, status) {

        if (this.props.board[row][col].status === 'dead') {
            this.props.board[row][col].status = 'alive';
        }
        else if (this.props.board[row][col].status === 'alive') {
            this.props.board[row][col].status = 'dead';
        }
        this.checkNeighbours(row, col);
        this.props.updateBoard(this.props.board);

    }
    componentDidMount() {
        this.props.toggleActive(this.props.isRunning);
        this.tick();

    }

    checkNeighbours(x, y) {
        const board = this.props.board;
        const width = board[0].length;
        const height = board.length;
        let total = 0;

        let topRow = x - 1 < 0 ? (height - 1) : x - 1;
        let bottomRow = (x + 1 === height) ? 0 : x + 1;
        let leftColumn = y - 1 < 0 ? (width - 1) : y - 1;
        let rightColumn = (y + 1 === width) ? 0 : y + 1;

        if (board[topRow][leftColumn].status === 'alive') total++;
        if (board[topRow][y].status === 'alive') total++;
        if (board[topRow][rightColumn].status === 'alive') total++;
        if (board[x][leftColumn].status === 'alive') total++;
        if (board[x][rightColumn].status === 'alive') total++;
        if (board[bottomRow][leftColumn].status === 'alive') total++;
        if (board[bottomRow][y].status === 'alive') total++;
        if (board[bottomRow][rightColumn].status === 'alive') total++;

        return total;

    }
    moveBoard() {
        const board = this.props.board;
        const width = board[0].length;
        console.log(width);
        const height = board.length;
        let updatedBoard = [];

        for (var i = 0; i < height; i++) {
            updatedBoard[i] = [];
            for (var j = 0; j < width; j++) {
                if (board[i][j].status === 'alive') {
                    if (this.checkNeighbours(i, j) < 2 || this.checkNeighbours(i, j) > 3) {
                        updatedBoard[i][j] = { id: j, status: 'dead' }
                    } else {
                        updatedBoard[i][j] = { id: j, status: 'alive' };
                    }
                }
                if (board[i][j].status === 'dead') {
                    if (this.checkNeighbours(i, j) === 3) {
                        updatedBoard[i][j] = { id: j, status: 'alive' };
                    } else {
                        updatedBoard[i][j] = { id: j, status: 'dead' }
                    }
                }
            }

        }

        console.log("updated");
        this.props.updateBoard(updatedBoard);
    }

    tick() { //main loop
        this.moveBoard();
        this.props.updateGeneration();
        let tick = requestAnimationFrame(this.tick);

    }

    render() {
        return (
            <table>
                
                    {this.props.board.map((row, i) =>
                        <div key={i}>
                            {row.map((column, j) =>
                                <div onClick={() => this.updateCell(i, j, column.status)} key={j} className={column.status}></div>
                            )}
                        </div>)}
               
            </table>
        )
    }

}
Cells.propTypes = {
    updateBoard: PropTypes.func,
    updateGeneration: PropTypes.func,
    board: PropTypes.array
};

export default Cells;