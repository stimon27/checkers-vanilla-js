import MoveValidator from "../validators/MoveValidator.js";
import { getFlatIndex } from "../model/Board.js";

export default class MovePawnService {
    static movePawn = (movePawnCommand) => {
        MoveValidator.validateMove(movePawnCommand);
        const { srcPosition, dstPosition, pawnType, board, size } =
            movePawnCommand;
        // TODO: Capture logic
        MovePawnService.movePawnOnBoard(srcPosition, dstPosition, size, board);
        throw new Error("NOT IMPLEMENTED YET");
    };

    static movePawnOnBoard(srcPosition, dstPosition, size, board) {
        const srcFlatIndex = getFlatIndex(srcPosition, size);
        const dstFlatIndex = getFlatIndex(dstPosition, size);
        board[dstFlatIndex].pawn = board[srcFlatIndex].pawn;
        board[srcFlatIndex].pawn = null;
    }
}
