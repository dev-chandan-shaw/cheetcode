import { compare, genSaltSync, hash } from "bcryptjs";
import environment from "../config/environment.config";
import { BadRequestError, ErrorHelper } from "./error.helper";
import { StatusCodes } from "http-status-codes";

/**
 * Class for handling encryption operations such as generating and validating hashes.
 * 
 * @constructor
 * Initializes the EncryptionHelper with the necessary configurations.
 * 
 * @method generateHash
 ** Asynchronously generates a hash for the input text using a hashing algorithm.
 * 
 * @method validate
 ** Asynchronously validates the provided text against the given digest.
 */
export default class EncryptionHelper {
    private _hashSalt: string;
    private _errorHelper: ErrorHelper;
    constructor() {
        this._errorHelper = new ErrorHelper();
        this._hashSalt = environment.HASH_SALT.toString();
        this._hashSalt = genSaltSync(+this._hashSalt);
    }
    /**
     * Asynchronously generates a hash for the input text using hashing algorithm.
     * 
     * @param {string} text - The text to be hashed.
     * @returns {Promise<string>} A promise that resolves to the generated hash string.
     * @throws Throws an error if there is an issue during the hashing process.
     */
    async generateHash(text: string): Promise<string> {
        try {
            const digest: string = await hash(text, this._hashSalt);
            return digest;
        } catch (error: any) {
            throw this._errorHelper.customError(error, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
    /**
     * Asynchronously validates the provided text against the given digest.
     * 
     * @param {string} text - The text to validate.
     * @param {string} digest - The digest to compare the text against.
     * @returns {Promise<boolean>} A Promise that resolves to a boolean indicating whether the text matches the digest.
     * @throws Throws a BadRequestError if an error occurs during the validation process.
     */
    async validate(text: string, digest: string): Promise<boolean> {
        try {
            let isValidate: boolean = false;
            isValidate = await compare(text, digest);
            return isValidate;
        } catch (error: any) {
            throw new BadRequestError(error.message);
        }
    }
}