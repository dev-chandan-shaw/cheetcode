import { IUser } from "../../interfaces/user.interface";
import IRepository from "./repository.abstract";

export abstract class IUserRepository extends IRepository<IUser> {}
