import { Injectable } from '@angular/core';
import { ICategory } from '../common/category';
import categories from './categories.json';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  public categories: ICategory[] = categories;

  public get rootCategories() {
    return this.categories.filter((category: ICategory) => !category.parentId)
  }

  constructor() {}
}
