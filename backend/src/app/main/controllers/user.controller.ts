import { IUser } from "../../domain/interfaces/user.interface";
import { UserService } from "../../services/user.service";
import Controller from "./controller";

export class UserController extends Controller<IUser, UserService> {
  constructor() {
    super(new UserService());
  }
}
