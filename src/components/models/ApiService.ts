import { IApi, IProduct, IOrder, IOrderResponse } from "../../types/index";


// Сервис для работы с API магазина
export class ApiService {
  private api: IApi;

  constructor(Api: IApi) {
    this.api = Api;
  }

  // Получение списка товаров
  async getProducts(): Promise<IProduct[]> {
    try {
      const data = await this.api.get<{ items: IProduct[] }>("/product");
      return data.items;
    } catch (error) {
      console.log("Не удалось загрузить товары: ", error);
      return [];
    }
  }

  // Отправка заказа
  postOrder(order: IOrder): Promise<IOrderResponse> {
      return this.api.post<IOrderResponse>("/order", order);
  }
}

export default ApiService;