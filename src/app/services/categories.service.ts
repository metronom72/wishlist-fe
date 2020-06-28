import { Injectable } from '@angular/core';
import { ICategory } from '../common/category';
import categories from './categories.json';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  public categories: ICategory[] = categories;

  constructor() { }
}
