import { Injectable } from '@angular/core';
import { ICategory } from '../common/category';
// import categories from './categories.json';

const categories = [
  {
    title: 'Мужчинам',
    order: 1,
    id: 1,
    parentId: null,
  },
  {
    title: 'Женщинам',
    order: 2,
    id: 2,
    parentId: null,
  },
  {
    title: 'Детям',
    order: 3,
    id: 3,
    parentId: null,
  },
];

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  public categories: ICategory[] = categories;

  public get rootCategories() {
    return this.categories.filter((category: ICategory) => !category.parentId);
  }

  public findSubcategories = (id: number | null) =>
    id
      ? this.categories.filter(
          (category: ICategory) => category.parentId === id
        )
      : [];

  constructor() {}
}
