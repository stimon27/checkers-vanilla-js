import InvalidPositionError from "../error/InvalidPositionError.js";
import InvalidPawnPositionError from "../error/InvalidPawnPositionError.js";
import BoardField from "../model/BoardField.js";

export default class PositionValidator {
    static validateIntegerValuesOfPositionCoordinates({ posX, posY }) {
        if (!(Number.isInteger(posX) && Number.isInteger(posY))) {
            throw new InvalidPositionError(
                `At least one of position (x: ${posX}, y: ${posY}) coordinates is not a valid integer value.`
            );
        }
    }

    static validatePositionCoordinatesInBounds({ posX, posY }, boardSize) {
        if (!(posX >= 0 && posX < boardSize && posY >= 0 && posY < boardSize)) {
            throw new InvalidPositionError(
                `At least one of position (x: ${posX}, y: ${posY}) coordinates does not meet the <0, ${boardSize}) constraint.`
            );
        }
    }

    static validateBoardFieldColor({ position, color }, reversedFieldColors) {
        const calculatedValidColor =
            PositionValidator.calculateCorrectBoardFieldColor(
                position,
                reversedFieldColors
            );
        if (color == !calculatedValidColor) {
            const { posX, posY } = position;
            throw new InvalidPositionError(
                `The field of position (x: ${posX}, y: ${posY}) should be ${calculatedValidColor}, but is ${pawn.color}}`
            );
        }
    }

    static calculateCorrectBoardFieldColor = (
        { posX, posY },
        reversedFieldColors
    ) => {
        return reversedFieldColors
            ? (posX + posY) % 2 === 0
                ? BoardField.FIELD_COLORS.BLACK
                : BoardField.FIELD_COLORS.WHITE
            : (posX + posY) % 2 === 0
            ? BoardField.FIELD_COLORS.WHITE
            : BoardField.FIELD_COLORS.BLACK;
    };

    static validatePawnOnlyIfFieldPlayable = (
        { position, pawn },
        reversedFieldColors,
        playOnBlack
    ) => {
        if (
            playOnBlack &&
            pawn != null &&
            !isBlack(position, reversedFieldColors)
        ) {
            throw new InvalidPawnPositionError(
                `Illegal Board Field state. ${pawn.color.description} ${pawn.type.description} is standing on a white Board Field on the (x: ${position.posX}, y: ${position.posY}) position, while only black Board Fields are playable.`
            );
        }
        if (
            !playOnBlack &&
            pawn != null &&
            isBlack(position, reversedFieldColors)
        ) {
            throw new InvalidPawnPositionError(
                `Illegal Board Field state. ${pawn.color.description} ${pawn.type.description} is standing on a black Board Field on the (x: ${position.posX}, y: ${position.posY}) position, while only white Board Fields are playable.`
            );
        }
    };

    static isBlack = ({ posX, posY }, reversedFieldColors) => {
        const isPosYEven = posY % 2 === 0;
        const isBlack = posX % 2 === 0 ? !isPosYEven : isPosYEven;
        return reversedFieldColors ? !isBlack : isBlack;
    };

    static validateBoardFieldData(
        boardField,
        boardSize,
        reversedFieldColors,
        playOnBlack
    ) {
        PositionValidator.validatePositionCoordinatesInBounds(
            boardField.position,
            boardSize
        );
        PositionValidator.validateBoardFieldColor(
            boardField,
            reversedFieldColors
        );
        PositionValidator.validatePawnOnlyIfFieldPlayable(
            boardField,
            playOnBlack
        );
    }
}

export const isBlack = PositionValidator.isBlack;
