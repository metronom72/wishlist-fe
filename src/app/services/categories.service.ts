import { Injectable } from '@angular/core';
import { ICategory } from '../common/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  public categories: ICategory[] = []
  constructor() { }
}
