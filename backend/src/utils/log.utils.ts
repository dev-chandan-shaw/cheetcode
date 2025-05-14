import { StreamOptions } from "morgan";
/**
 * A utility class for logging messages with different log levels and colors.
 */
export class LogUtils {
    /**
     * The tag to be used for identifying the log messages.
     * @private
     */
    private _tag: string;
    /**
     * Creates an instance of the LogUtils class.
     *
     * @param {string} tag - The tag to be used for identifying the log messages.
     */
    constructor(tag: string) {
        this._tag = tag;
    }
    /**
     * Logs a success message with a green color.
     *
     * @param {string | object} message - The message to be logged.
     */
    public success(message: string | object): void {
        this.printMessage(message, "\x1b[32m");
    }
    /**
     * Logs an informational message with a blue color.
     *
     * @param {string | object} message - The message to be logged.
     */
    public info(message: string | object): void {
        this.printMessage(message, "\x1b[36m");
    }
    /**
     * Logs a warning message with a yellow color.
     *
     * @param {string | object} message - The message to be logged.
     */
    public warn(message: string | object): void {
        this.printMessage(message, "\x1b[33m");
    }
    /**
     * Logs an error message with a red color.
     *
     * @param {string | object} message - The message to be logged.
     */
    public error(message: string | object): void {
        this.printMessage(message, "\x1b[31m");
    }
    /**
     * Prints a message to the console with a specified color and tag.
     *
     * @param {string | object} message - The message to be printed.
     * @param {string} color - The ANSI color code for the message.
     * @private
     */
    private printMessage(message: string | object, color: string): void {
        process.stdout.write(`\x1b[1m${color} [${this._tag}]  \x1b[0m`);
        console.log(`${color}%s\x1b[0m`, message);
    }
}
/**
 * A class that implements the StreamOptions interface for logging success messages.
 */
export class SuccessStream implements StreamOptions {
    /**
     * Writes a success message to the console with a timestamp.
     *
     * @param {string} line - The message to be logged.
     */
    write(line: string): void {
        const date: Date = new Date();
        new LogUtils(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`).success(line);
    }
}
/**
 * A class that implements the StreamOptions interface for logging error messages.
 */
export class ErrorStream implements StreamOptions {
    /**
     * Writes an error message to the console with a timestamp.
     *
     * @param {string} line - The message to be logged.
     */
    write(line: string): void {
        const date: Date = new Date();
        new LogUtils(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`).error(line);
    }
}