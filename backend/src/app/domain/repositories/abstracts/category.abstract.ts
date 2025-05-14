import { ICategory } from "../../interfaces/category.interface";
import IRepository from "./repository.abstract";

export abstract class ICategoryRepository extends IRepository<ICategory> {}
