import mongoose from "mongoose";
import { LogUtils } from "../utils/log.utils";
import environment from "./environment.config";
/**
 * A class that handles the configuration and connection to a MongoDB database.
 */
export default class DatabaseConfig {
  /**
   * The connection URI for the MongoDB database.
   * @protected
   */
  protected _connectionURI: string = "";
  /**
   * An instance of the LogUtils class for logging MongoDB-related messages.
   * @protected
   */
  protected _log: LogUtils = new LogUtils("MongoDB");
  /**
   * Establishes a connection to the MongoDB database.
   *
   * @returns {Promise<void>} A Promise that resolves when the database connection is successful.
   */
  async MongoConnection(): Promise<void> {
    mongoose.set("strictQuery", false);
    mongoose.set("strictPopulate", false);
    try {
      this._connectionURI = environment.MONGO_DB_URL as string;
      await mongoose.connect(this._connectionURI);
      this._log.success("Database connected");
    } catch (error: any) {
      this._log.error(`Unable to established connection!\n${error}`);
    }
  }
}
