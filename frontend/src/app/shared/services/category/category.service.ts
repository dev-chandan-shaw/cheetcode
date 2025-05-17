import { inject, Injectable, Signal, signal } from "@angular/core";
import { Category } from "../../models/category";
import { CategoryApiService } from "./category.api.service";

@Injectable({
    providedIn: "root",
})
export class CategoryService {
    private _categories = signal<Category[]>([]);
    private _categoryApiService = inject(CategoryApiService);

    fetchCategories() {
        this._categoryApiService.getCategories().subscribe((categories) => {
            this._categories.set(categories);
        });
    }

    getCategories() : Signal<Category[]> {
        return this._categories;
    }


}