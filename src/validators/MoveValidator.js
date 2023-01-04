import InvalidMoveError from "../error/InvalidMoveError.js";
import PositionValidator from "./PositionValidator.js";
import { getFlatIndex } from "../model/Board.js";
import { PAWN_TYPES } from "../model/Pawn.js";

export default class MoveValidator {
    static DIRECTIONS = Object.freeze({
        NE: Symbol("NE"),
        SE: Symbol("SE"),
        SW: Symbol("SW"),
        NW: Symbol("SW"),
    });

    static validateMove = ({
        srcPosition,
        dstPosition,
        pawnType,
        board,
        size,
    }) => {
        PositionValidator.validatePositionCoordinatesInBounds(dstPosition);
        MoveValidator.validateBasicMoveRules(
            srcPosition,
            dstPosition,
            board,
            size
        );
        MoveValidator.validateDiagonalDirection(srcPosition, dstPosition);
        MoveValidator.validateMoveWithPawnData(
            srcPosition,
            dstPosition,
            pawnType
        );
    };

    static validateBasicMoveRules(srcPosition, destPosition, board, size) {
        if (!MoveValidator.isPositionTaken(srcPosition, board, size)) {
            throw new InvalidMoveError(
                `Invalid move attempt. Starting position (x: ${srcPosX}, y: ${srcPosY}) is not currently occupied by any Pawn.`
            );
        }
        if (MoveValidator.isPositionTaken(destPosition, board, size)) {
            throw new InvalidMoveError(
                `Invalid move attempt. Target position (x: ${destPosX}, y: ${destPosY}) is currently occupied by a ${srcBoardField.pawn.color.toString()} ${srcBoardField.pawn.type.toString()}.`
            );
        }
        const { srcPosX, srcPosY } = srcPosition;
        const { destPosX, destPosY } = destPosition;
        if (srcPosX === destPosX && srcPosY === destPosY) {
            throw new InvalidMoveError(
                `Invalid move attempt. Starting position (x: ${srcPosX}, y: ${srcPosY}) and target position (${destPosX}, ${destPosY}) are equal.`
            );
        }
    }

    static validateDiagonalDirection = (
        { srcPosX, srcPosY },
        { dstPosX, dstPosY }
    ) =>
        dstPosX - dstPosY == srcPosX - srcPosY ||
        dstPosX + dstPosY == srcPosX + srcPosY;

    static validateMoveWithPawnData(srcPosition, dstPosition, pawnType) {
        switch (pawnType) {
            case PAWN_TYPES.MAN.description:
                MoveValidator.validateMoveForPawnOfTypeMan(
                    srcPosition,
                    dstPosition
                );
                break;
            case PAWN_TYPES.KING.description:
                MoveValidator.validateMoveForPawnOfTypeKing(
                    srcPosition,
                    dstPosition
                );
                break;
            default:
                throw new InvalidMoveError("Unknown pawn type: " + pawnType);
        }
    }

    static validateMoveForPawnOfTypeMan(srcPosition, destPosition) {
        // TODO: Implement
        throw new Error("NOT IMPLEMENTED YET");
    }

    static validateMoveForPawnOfTypeKing(srcPosition, destPosition) {
        // TODO: Implement
        throw new Error("NOT IMPLEMENTED YET");
    }

    static isPositionTaken = (position, board, size) =>
        board[getFlatIndex(position, size)].pawn != null;

    // static calculateDirection(srcPosition, destPosition) {
    //     return destPosition.posY > srcPosition.posY
    //         ? destPosition.posX > srcPosition.posX
    //             ? MoveValidator.DIRECTIONS.NE
    //             : MoveValidator.DIRECTIONS.NW
    //         : destPosition.posX > srcPosition.posX
    //         ? MoveValidator.DIRECTIONS.SE
    //         : MoveValidator.DIRECTIONS.SW;
    // }

    // static calculateDiagonalJumps(srcPositionX, destPositionX) {
    //     return Math.abs(srcPositionX - destPositionX);
    // }
}
