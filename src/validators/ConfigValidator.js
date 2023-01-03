import InvalidConfigurationError from "../error/InvalidConfigurationError.js";

export default class ConfigValidator {
    static validateConfig = (config) => {
        if (!config.hasOwnProperty("gameMode")) {
            throw new InvalidConfigurationError(
                "Invalid configuration: config.gameMode not defined"
            );
        }
        if (!typeof config.gameMode === "string") {
            throw new InvalidConfigurationError(
                "Invalid configuration: config.gameMode is not a valid string value"
            );
        }
        if (!config.hasOwnProperty("playOnBlack")) {
            throw new InvalidConfigurationError(
                "Invalid configuration: config.playOnBlack not defined"
            );
        }
        if (!typeof config.playOnBlack === "boolean") {
            throw new InvalidConfigurationError(
                "Invalid configuration: config.playOnBlack is not a valid boolean value"
            );
        }
        if (!config.hasOwnProperty("blackPawnsOnTop")) {
            throw new InvalidConfigurationError(
                "Invalid configuration: config.blackPawnsOnTop not defined"
            );
        }
        if (!typeof config.blackPawnsOnTop === "boolean") {
            throw new InvalidConfigurationError(
                "Invalid configuration: config.blackPawnsOnTop is not a valid boolean value"
            );
        }
        if (!config.hasOwnProperty("reversedFieldColors")) {
            throw new InvalidConfigurationError(
                "Invalid configuration: config.reversedFieldColors not defined"
            );
        }
        if (!typeof config.reversedFieldColors === "boolean") {
            throw new InvalidConfigurationError(
                "Invalid configuration: config.reversedFieldColors is not a valid boolean value"
            );
        }
    };
}
