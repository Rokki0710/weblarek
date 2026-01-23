import { IProduct } from "../../types/index.ts";
import { IEvents } from "../base/Events.ts";
import { actions } from "../../utils/actions.ts";

// Модель товаров каталога
export class Product {
  protected items: IProduct[] = [];
  protected selectedItem: IProduct | null = null;
  
  constructor(private events: IEvents) {
    this.events = events;
  }

  // Установка списка товаров
  setItems(items: IProduct[]): void {
    this.items = items;
    this.events.emit(actions.PRODUCT_RECIEVED, items);
  }

  // Получение всех товаров
  getItems(): IProduct[] {
    return this.items;
  }

  // Поиск товара по ID
  getItemById(id: string): IProduct | undefined {
    return this.items.find((item) => item.id === id);
  }

  // Установка выбранного товара
  setSelectedItem(item: IProduct): void {
    this.selectedItem = item;
    this.events.emit(actions.CARD_OPEN, item);
  }

  // Получение выбранного товара
  getSelectedItem(): IProduct | null {
    return this.selectedItem;
  }
}

export default Product;