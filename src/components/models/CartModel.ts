import { IProduct } from "../../types";

/**
 * Модель для работы с корзиной
 * Отвечает за хранение и управление товарами в корзине
 */

export class CartModel {
  private items: IProduct[] = [];

  constructor() {}

  getItems(): IProduct[] {
    return [...this.items];
  }

  /**
   * Предполагается, что UI не позволит добавить товар, уже находящийся в корзине,
   * и удалить товар, которого нет в корзине. Но на всякий случай я добавлю защиту
   * на случай нарушения этого предположения
   */
  contains(itemId: string): boolean {
    return this.items.some((item) => item.id === itemId);
  }

  addItem(item: IProduct): void {
    if (!item || typeof item !== "object") {
      throw new Error("Не валидный продукт");
    }
    if (!item.id || typeof item.id !== "string") {
      throw new Error("Не валидный ID");
    }

    if (item.price === null) {
      throw new Error("Товар бесценный)");
    }

    if (this.contains(item.id)) {
      console.warn("Товар уже находится в корзине");
      return;
    }
    this.items.push({ ...item });
  }

  removeItem(itemId: string): void {
    if (!itemId || typeof itemId !== "string") {
      throw new Error("Не валидный ID");
    }

    if (!this.contains(itemId)) {
      console.warn("Товар не найден в корзине");
      return;
    }

    this.items = this.items.filter((item) => item.id !== itemId);
  }

  getTotalCount(): number {
    return this.items.length;
  }

  getTotalPrice(): number {
    return this.items.reduce((total, item) => {
      return total + (item.price || 0);
    }, 0);
  }

  clear(): void {
    this.items = [];
  }
}
