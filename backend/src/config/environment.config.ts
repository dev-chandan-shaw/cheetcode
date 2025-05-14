import { config } from "dotenv";
import { Environment } from "../types/core.types";
/**
 * Loads environment variables from a .env file.
 */
config();
/**
 * The environment configuration object.
 *
 * @type {Environment}
 */
const environment: Environment=require(`../environments/${process.env.NODE_ENV?.toLowerCase()}.env.ts`).default;
/**
 * Exports the environment configuration object.
 *
 * @type {Environment}
 */
export default environment;