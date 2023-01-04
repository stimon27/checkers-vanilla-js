import GameModes from "./GameModes.js";
import BoardField from "./BoardField.js";
import Pawn from "./Pawn.js";
import DEFAULT_BOARD_CONFIG from "../config/DefaultBoardConfig.js";
import PositionValidator from "../validators/PositionValidator.js";
import ConfigValidator from "../validators/ConfigValidator.js";

export default class Board {
    setInitialState(config) {
        this._config = config;
        this._board = null;
        this._size = NaN;
    }

    constructor(config) {
        ConfigValidator.validateConfig(config);
        this.setInitialState(config);
    }

    static createDefaultBoard() {
        return new Board(JSON.parse(DEFAULT_BOARD_CONFIG));
    }

    static createCustomBoard(config) {
        return new Board(config);
    }

    get config() {
        return Object.freeze(this._config);
    }

    get board() {
        return Object.freeze(this._board);
    }

    get size() {
        return this._size;
    }

    reset(config = JSON.parse(DEFAULT_BOARD_CONFIG)) {
        ConfigValidator.validateConfig(config);
        this.setInitialState(config);
    }

    initializeBoard() {
        this._board = [];
        Board.getGrid(this._size)
            .map((position) => {
                return this._config.playOnBlack
                    ? PositionValidator.isBlack(
                          position,
                          this._config.reversedFieldColors
                      )
                        ? new BoardField(
                              position,
                              BoardField.FIELD_COLORS.BLACK,
                              new Pawn(
                                  Pawn.PAWN_TYPES.MAN,
                                  this.calculateColor(position)
                              )
                          )
                        : new BoardField(
                              position,
                              BoardField.FIELD_COLORS.WHITE,
                              null
                          )
                    : PositionValidator.isBlack(
                          position,
                          this._config.reversedFieldColors
                      )
                    ? new BoardField(
                          position,
                          BoardField.FIELD_COLORS.BLACK,
                          null
                      )
                    : new BoardField(
                          position,
                          BoardField.FIELD_COLORS.WHITE,
                          new Pawn(
                              Pawn.PAWN_TYPES.MAN,
                              this.calculateColor(position)
                          )
                      );
            })
            .forEach((boardField) => {
                PositionValidator.validateBoardFieldData(
                    boardField,
                    this._size,
                    this._config.reversedFieldColors,
                    this._config.playOnBlack
                );
                this._board.push(boardField);
            });
        this._size = this._board.length;
    }

    calculateColor(position) {
        return this._config.blackPawnsOnTop
            ? [0, 1].some((indexY) => indexY === position.posY)
                ? Pawn.PAWN_COLORS.BLACK
                : Pawn.PAWN_COLORS.WHITE
            : [0, 1].some((indexY) => indexY === position.posY)
            ? Pawn.PAWN_COLORS.WHITE
            : Pawn.PAWN_COLORS.BLACK;
    }

    loadGameMode() {
        switch (this._config.gameMode) {
            case GameModes.CLASSIC.description:
                this._size = 8;
                break;
            case GameModes.INTERNATIONAL.description:
                this._size = 10;
                break;
            default:
                throw new Error(
                    `Invalid value: unknown game mode: ${this._config.gameMode}`
                );
        }
    }

    getPawn = (position) => {
        PositionValidator.validatePosition(position);
        return this._board[
            Board.getFlatIndex(position, this._size)
        ].getPawn() != null
            ? Object.freeze(
                  this._board[
                      Board.getFlatIndex(position, this._size)
                  ].getPawn()
              )
            : null;
    };

    static getGrid = (size) =>
        Array(size)
            .fill()
            .map((a, i) =>
                Array(size)
                    .fill()
                    .map((b, j) => ({ posX: j, posY: i }))
            )
            .flatMap((x) => x);

    static getFlatIndex = ({ posX, posY }, size) => posY * size + posX;
}
