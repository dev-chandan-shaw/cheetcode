import App from "./app";
import DatabaseConfig from "./config/database.config";
import environment from "./config/environment.config";
import { LogUtils } from "./utils/log.utils";
/**
 * The main entry point of the application.
 *
 * This is an immediately invoked asynchronous function that initializes the application components
 * and starts the server.
 */
(async function () {
    /**
     * An instance of the LogUtils class for logging application-level messages.
     * @type {LogUtils}
     */
    const log: LogUtils = new LogUtils(`APP`);
    try {
        /**
         * An instance of the DatabaseConfig class for managing the database connection.
         * @type {DatabaseConfig}
         */
        const db: DatabaseConfig = new DatabaseConfig();
        /**
         * An instance of the App class, which represents the main application.
         * @type {App}
         */
        const  app: App = new App();
        // Establish the database connection
        await db.MongoConnection();
        // Start the server and listen for incoming requests
        app.app.listen(environment.PORT, () => {
            log.info(`${environment.NODE_ENV} server is running on http://localhost:${environment.PORT}`);
        })
    } catch (error: any) {
        // Log any errors that occurred during the application initialization
        log.error(`Unable to start server.\n${error.message}`);
        // Exit the process with a non-zero status code to indicate failure
        process.exit(1);
    }
})();