import { ICustomer } from "../../types/index";
import { actions } from "../../utils/actions";
import { IEvents } from "../base/Events";

// Класс для работы с данными покупателя
export class Customer {
  private customerInfo: Partial<ICustomer> = {};

  constructor(private events: IEvents) {
    // Не нужно дублировать присваивание this.events = events;
    // Параметр уже сохранен в приватное поле
  }

  // Обновление данных покупателя
  setCustomerInfo(customerInfo: Partial<ICustomer>): void {
    // Более простой способ объединения объектов
    this.customerInfo = { ...this.customerInfo, ...customerInfo };
    this.events.emit(actions.CUSTOMER_UPDATE);
  }

  // Получить данные покупателя
  getCustomerInfo(): Partial<ICustomer> {
    return { ...this.customerInfo };
  }

  // Получить ВАЛИДНЫЕ данные покупателя (после проверки)
  getValidatedCustomerInfo(): ICustomer {
    const errors = this.validate();
    if (Object.keys(errors).length > 0) {
      throw new Error(`Данные не валидны: ${JSON.stringify(errors)}`);
    }
    return this.customerInfo as ICustomer;
  }

  // Очистить данные покупателя
  clearCustomerInfo(): void {
    this.customerInfo = {};
    this.events.emit(actions.CUSTOMER_UPDATE);
  }

  // Проверка корректности данных (переименовал для единообразия)
  validate(): { [key in keyof ICustomer]?: string } {
    const errors: { [key in keyof ICustomer]?: string } = {};
    
    if (!this.customerInfo.payment) {
      errors.payment = "Укажите тип оплаты";
    }
    
    if (!this.customerInfo.email) {
      errors.email = "Укажите email";
    } else if (!this.isValidEmail(this.customerInfo.email)) {
      errors.email = "Некорректный формат email";
    }
    
    if (!this.customerInfo.address) {
      errors.address = "Укажите адрес";
    }
    
    if (!this.customerInfo.phone) {
      errors.phone = "Укажите номер телефона";
    } else if (!this.isValidPhone(this.customerInfo.phone)) {
      errors.phone = "Некорректный формат телефона";
    }

    return errors;
  }

  // Проверка, все ли данные заполнены
  isComplete(): boolean {
    return Object.keys(this.validate()).length === 0;
  }

  // Вспомогательные методы валидации (опционально)
  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private isValidPhone(phone: string): boolean {
    // Простая проверка - минимум 10 цифр
    return phone.replace(/\D/g, '').length >= 10;
  }
}

export default Customer;