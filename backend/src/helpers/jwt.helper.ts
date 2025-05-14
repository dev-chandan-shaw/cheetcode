import { sign, verify } from "jsonwebtoken";
import environment from "../config/environment.config";
import { ErrorHelper, ForbiddenError } from "./error.helper";
import { StatusCodes } from "http-status-codes";

/**
 * Class for handling encryption operations such as generating and validating JWT token.
 * 
 * @method createToken
 ** Asynchronously creates a JWT token based on the provided payload.
 * 
 * @method validateToken
 ** Asynchronously validates the provided token.
 */
export default class JWTHelper {
    private _tokenKey: string = environment.JWT_KEY as string;
    private _tokenLife: number = environment.JWT_LIFE as number;
    private _errorHelper: ErrorHelper = new ErrorHelper();

    /**
     * Asynchronously creates a JWT token based on the provided payload.
     * 
     * @param {any} payload - The data to be included in the token.
     * @returns {Promise<string>} A Promise that resolves with the generated JWT token.
     * @throws Throws an error if there is an issue during token creation.
     */
    async createToken(payload: any): Promise<string> {
        try {
            const token: string = await sign(payload, this._tokenKey, {
                expiresIn: this._tokenLife
            });
            return token;
        } catch (error: any) {
            throw this._errorHelper.customError(error, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Asynchronously validates the provided token.
     * 
     * @param {string} token - The token to be validated.
     * @returns {Promise<any>} A promise that resolves with the payload if the token is valid.
     * @throws If the token validation fails.
     */
    async validateToken(token: string): Promise<any> {
        try {
            const payload: any = await verify(token, this._tokenKey);
            return payload;
        } catch (error: any) {
            throw new ForbiddenError(error.message);
        }
    }
}