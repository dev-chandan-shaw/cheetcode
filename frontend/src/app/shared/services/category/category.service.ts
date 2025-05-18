import { inject, Injectable, Signal, signal } from "@angular/core";
import { Category } from "../../models/category";
import { CategoryApiService } from "./category.api.service";

@Injectable({
    providedIn: "root",
})
export class CategoryService {
    private _categories = signal<Category[]>([]);
    private _categoryApiService = inject(CategoryApiService);
    private isLoading = signal<boolean>(false);

    fetchCategories() {
        this.isLoading.set(true);
        this._categoryApiService.getCategories().subscribe((categories) => {
            this._categories.set(categories);
            this.isLoading.set(false);
        });
    }

    isLoadingCategories() {
        return this.isLoading;
    }

    getCategories() : Signal<Category[]> {
        return this._categories;
    }

    addCategory(name: string) {
        return this._categoryApiService.addCategory(name);
    }


}