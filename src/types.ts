// types.ts
export interface Item {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
}

export type FormItem = Omit<Item, "id">;
