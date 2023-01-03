import PositionValidator from "../validators/PositionValidator.js";

export default class BoardField {
    static FIELD_COLORS = Object.freeze({
        WHITE: Symbol("white"),
        BLACK: Symbol("black"),
    });

    constructor(position, color, pawn) {
        this._position = position;
        PositionValidator.validateIntegerValuesOfPositionCoordinates(position);
        this._color = color;
        this._pawn = pawn;
    }

    get position() {
        return Object.freeze(this._position);
    }

    get color() {
        return this._color;
    }

    get pawn() {
        return Object.freeze(this._pawn);
    }

    set pawn(pawn) {
        this._pawn = pawn;
    }

    static validateColor(color) {
        if (
            !Object.values(BoardField.FIELD_COLORS).some(
                (fieldColor) => fieldColor === color
            )
        ) {
            throw new Error(`Unknown Board Field color: ${color}`);
        }
    }
}
