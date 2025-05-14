import { ICategory } from "../interfaces/category.interface";
import Category from "../models/category.model";
import { ICategoryRepository } from "./abstracts/category.abstract";
import Repository from "./repository";

export class CategoryRepository
  extends Repository<ICategory>
  implements ICategoryRepository
{
  constructor() {
    super(new Category().getCollection());
  }
}
