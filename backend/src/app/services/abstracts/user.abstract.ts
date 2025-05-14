import { IUser } from "../../domain/interfaces/user.interface";
import IService from "./service.abstract";

export abstract class IUserService extends IService<IUser> {}
