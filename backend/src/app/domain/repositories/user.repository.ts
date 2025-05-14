import { IUser } from "../interfaces/user.interface";
import User from "../models/user.model";
import { IUserRepository } from "./abstracts/user.abstract";
import Repository from "./repository";

export class UserRepository
  extends Repository<IUser>
  implements IUserRepository
{
  constructor() {
    super(new User().getCollection());
  }
}
