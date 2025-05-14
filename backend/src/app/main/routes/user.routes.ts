import { IRouter, Router } from "express";
import { UserController } from "../controllers/user.controller";
import AsyncUtils from "../../../utils/async.utils";

export default class UserRoute {
  public routes: IRouter;
  private _controller: UserController;
  private _asyncUtils: AsyncUtils;

  constructor() {
    this.routes = Router();
    this._asyncUtils = new AsyncUtils();
    this._controller = new UserController();
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.routes.get(
      "/:id",
      this._asyncUtils.wrapHandler(
        this._controller.getDocument.bind(this._controller)
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
