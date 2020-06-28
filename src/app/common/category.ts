export interface ICategory {
  id: string;
  title: string;
  order: number;
  subcategories: ICategory[];
}
