import { IRouter, Router } from "express";
import { UserController } from "../controllers/user.controller";
import AsyncUtils from "../../../utils/async.utils";
import { CategoryController } from "../controllers/category.controller";
import { QuestionController } from "../controllers/question.controller";

export default class QuestionRoute {
  public routes: IRouter;
  private _controller: QuestionController;
  private _asyncUtils: AsyncUtils;

  constructor() {
    this.routes = Router();
    this._asyncUtils = new AsyncUtils();
    this._controller = new QuestionController();
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.routes.get(
      "/:id",
      this._asyncUtils.wrapHandler(
        this._controller.getDocument.bind(this._controller)
      )
    );
    this.routes.get(
      "/category/:id",
      this._asyncUtils.wrapHandler(
        this._controller.getQuestionsByCategory.bind(this._controller)
      )
    );
    this.routes.post(
      "/",
      this._asyncUtils.wrapHandler(
        this._controller.createDocument.bind(this._controller)
      )
    );
    this.routes.patch(
      "/:id",
      this._asyncUtils.wrapHandler(
        this._controller.updateDocument.bind(this._controller)
      )
    );
    this.routes.delete(
      "/:id",
      this._asyncUtils.wrapHandler(
        this._controller.deleteDocument.bind(this._controller)
      )
    );
    this.routes.get(
      "/",
      this._asyncUtils.wrapHandler(
        this._controller.getDocuments.bind(this._controller)
      )
    );
  }
}
