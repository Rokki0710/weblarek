// Типы методов для запросов с данными
export type ApiPostMethods = "POST" | "PUT" | "DELETE";

// Варианты оплаты
export type TPayment = "cash" | "card";

// Интерфейс API клиента
export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods
  ): Promise<T>;
}

// Интерфейс товара
export interface IProduct {
  id: string;
  price: number | null;
  image: string;
  description: string;
  category: string;
  title: string;
}

// Интерфейс покупателя
export interface ICustomer {
  email?: string | null;
  phone?: string | null;
  payment?: TPayment | null;
  address?: string | null;
}

// Интерфейс заказа
export interface IOrder extends ICustomer {
  total: number;
  items: string[];
}

// Ответ от сервера на заказ
export interface IOrderResponse {
  id: string;
  total: number;
}

// Действия для карточки
export interface ICardActions {
  onClick(): void;
}