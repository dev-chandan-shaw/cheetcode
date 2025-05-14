import { ICategory } from "../../domain/interfaces/category.interface";
import IService from "./service.abstract";

export abstract class ICategoryService extends IService<ICategory> {}
