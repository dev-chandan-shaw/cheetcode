import { IUser } from "../domain/interfaces/user.interface";
import { IUserRepository } from "../domain/repositories/abstracts/user.abstract";
import { UserRepository } from "../domain/repositories/user.repository";
import { IUserService } from "./abstracts/user.abstract";
import Service from "./service";

export class UserService
  extends Service<IUser, UserRepository>
  implements IUserService
{
  constructor() {
    super(new UserRepository());
  }
}
