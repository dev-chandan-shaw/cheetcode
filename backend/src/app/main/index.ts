import { IRouter, Router } from "express";
import Routes from "./routes";

/**
 * A class that initializes and manages the application entry points.
 */
export default class AppRoute {
    /**
     * The main router instance used to define application routes.
     */
    public routes: IRouter;
    /**
     * An instance of the Routes class for managing API routes.
     * @private
     */
    private _apiRoutes: Routes;
    /**
     * Creates an instance of the AppRoute class and initializes the main router and API routes.
     */
    constructor() {
        this.routes = Router();
        this._apiRoutes = new Routes();
        this.initializeRoutes();
    }
    /**
     * Initializes the application routes by mounting the API routes.
     */
    public initializeRoutes(): void {
        this.routes.use("/v1", this._apiRoutes.routes);
    }
}