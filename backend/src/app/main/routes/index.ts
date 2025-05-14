import { IRouter, Router } from "express";
import UserRoute from "./user.routes";

/**
 * A class that initializes and manages the routes for an application's operations.
 */
export default class Routes {
  /**
   * The router instance used to define routes.
   * @public
   */
  public routes: IRouter;
  /**
   * Creates an instance of the Routes class and initializes the router and AsyncUtils instances.
   */
  constructor() {
    this.routes = Router();
    this.initializeRoutes();
  }
  /**
   * Initializes the routes for the application's operations.
   * This method should be overridden to define the actual routes.
   */
  public initializeRoutes(): void {
    //define operation's routes here
    const userRoutes = new UserRoute();
    this.routes.use("/user", userRoutes.routes);
  }
}
