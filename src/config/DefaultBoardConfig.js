// ↓ You can configure your Checkers game here ↓

const gameMode = "classic"; // string value, available game modes: "classic" (8x8), "international" (10x10)
const playOnBlack = true; // boolean value indicating whether black Board Fields are used to play the game
const blackPawnsOnTop = true; // boolean value inicating whether black Pawns start from the top of the Board
const reversedFieldColors = false; // boolean value inicating whether A8 Board Field is black

const DEFAULT_BOARD_CONFIG = `{
    "gameMode": "${gameMode}", 
    "playOnBlack": ${new Boolean(playOnBlack)}, 
    "blackPawnsOnTop": ${new Boolean(blackPawnsOnTop)}, 
    "reversedFieldColors": ${new Boolean(reversedFieldColors)}}`;
export default DEFAULT_BOARD_CONFIG;
