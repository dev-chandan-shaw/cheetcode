import { IRouter, Router } from "express";
import UserRoute from "./user.routes";
import CategoryRoute from "./category.routes";
import QuestionRoute from "./question.routes";

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

    const categoryRoutes = new CategoryRoute();
    this.routes.use("/category", categoryRoutes.routes);

    const questionRoutes = new QuestionRoute();
    this.routes.use("/question", questionRoutes.routes);
  }
}
