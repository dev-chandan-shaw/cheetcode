import { ICategory } from "../domain/interfaces/category.interface";
import { CategoryRepository } from "../domain/repositories/category.repository";
import { ICategoryService } from "./abstracts/category.abstract";
import Service from "./service";

export class CategoryService
  extends Service<ICategory, CategoryRepository>
  implements ICategoryService
{
  constructor() {
    super(new CategoryRepository());
  }
}
