import { ICategory } from "../../domain/interfaces/category.interface";
import { CategoryService } from "../../services/category.service";
import Controller from "./controller";

export class CategoryController extends Controller<ICategory, CategoryService> {
  constructor() {
    super(new CategoryService());
  }
}
