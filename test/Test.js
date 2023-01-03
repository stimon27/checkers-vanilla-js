import Board from "../src/model/Board.js";

/*
    Function used to test the program. It is going to evolve along with the development process.
*/
const test = () => {
    const board = Board.createDefaultBoard();
    try {
        board.loadGameMode();
        board.initializeBoard();
    } catch (e) {
        console.error(e);
    }
    console.debug(board);
};

test();
