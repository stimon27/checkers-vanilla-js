export default class Pawn {
    static PAWN_TYPES = Object.freeze({
        MAN: Symbol("Man"),
        KING: Symbol("King"),
    });

    static PAWN_COLORS = Object.freeze({
        WHITE: Symbol("white"),
        BLACK: Symbol("black"),
    });

    constructor(type, color) {
        Pawn.validateType(type);
        this._type = type;
        Pawn.validateColor(color);
        this._color = color;
    }

    static validateType(type) {
        if (
            !Object.values(Pawn.PAWN_TYPES).some(
                (pawnType) => pawnType === type
            )
        ) {
            throw new Error("Invalid value: unknown pawn type.");
        }
    }

    static validateColor(color) {
        if (
            !Object.values(Pawn.PAWN_COLORS).some(
                (pawnColor) => pawnColor === color
            )
        ) {
            throw new Error("Invalid value: unknown pawn color.");
        }
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this.validateType(value);
        this._type = value;
    }

    get color() {
        return this._color;
    }

    static createPawn() {}
}

export const PAWN_TYPES = Pawn.PAWN_TYPES;
