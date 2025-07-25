import { inject, Injectable } from '@angular/core';
import { CategoryApiService } from './category-api.service';
import { map, Observable, of, shareReplay, tap } from 'rxjs';
import { ICategory } from '../../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private _categoryApiService = inject(CategoryApiService);
  private _categories: ICategory[] | undefined = undefined;

  getCategories(): Observable<ICategory[]> {
    if (this._categories) {
      return of(this._categories); // emits cached value
    }

    return this._categoryApiService.getCategories().pipe(
      map(response => response.data || []),
      tap(categories => this._categories = categories), // cache the result
      shareReplay(1) // optional: avoids multiple HTTP calls if multiple subscribers
    );
  }
}
