import { IProduct } from "../../types/index.ts";
import { IEvents } from "../base/Events.ts";
import { actions } from "../../utils/actions.ts";

// Корзина покупок
export class Cart {
  private addedProduct: IProduct[] = []; // Товары в корзине

  constructor(private events: IEvents) {
    this.events = events;
  }

  // Получить все товары
  getItems(): IProduct[] {
    return this.addedProduct;
  }

  // Добавить товар в корзину
  addToCart(addedProduct: IProduct): void {
    this.addedProduct.push(addedProduct);
    this.events.emit(actions.CART_UPDATE); // Уведомляем об изменении
  }

  // Удалить товар по ID
  removeFromCart(productID: string): void {
    this.addedProduct = this.addedProduct.filter(
      (product) => product.id !== productID
    );
    this.events.emit(actions.CART_UPDATE);
  }

  // Очистить корзину
  removeAllItems(): void {
    this.addedProduct = [];
    this.events.emit(actions.CART_UPDATE);
  }

  // Посчитать общую стоимость
  getTotalCost(): number {
    return this.addedProduct.reduce(
      (total, product) =>
        typeof product.price === "number" ? total + product.price : total,
      0
    );
  }

  // Получить количество товаров
  getAmountOfItems(): number {
    return this.addedProduct.length;
  }

  // Проверить наличие товара в корзине
  isAvailable(productID: string): boolean {
    return this.addedProduct.some((product) => product.id === productID);
  }
}

export default Cart;