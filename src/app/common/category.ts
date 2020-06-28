export interface ICategory {
  id: number;
  parentId: number | null;
  title: string;
  order: number;
}
