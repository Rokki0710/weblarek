import { IApi, IProduct, IOrderData, IOrderResult } from "../../types";

export class ApiService {
  constructor(private api: IApi) {}

  /**
   * Получает каталог товаров с сервера
   * @returns Promise с массивом товаров
   */
  getProductList(): Promise<IProduct[]> {
    return this.api.get<{ items: IProduct[] }>("/product")
      .then(data => data.items);
  }

  /**
   * Отправляет заказ на сервер
   * @param order - данные заказа
   * @returns Promise с результатом заказа
   */
  submitOrder(order: IOrderData): Promise<IOrderResult> {
    return this.api.post<IOrderResult>("/order", order);
  }
}