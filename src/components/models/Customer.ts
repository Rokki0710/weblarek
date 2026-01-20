import { ICustomer } from "../../types/index";
import { actions } from "../../utils/actions";
import { IEvents } from "../base/Events";


// Класс для работы с данными покупателя
export class Customer {
  private customerInfo: ICustomer = {
    payment: null,
    email: null,
    phone: null,
    address: null,
  };

  constructor(private events: IEvents) {
    this.events = events;
  }

  // Обновление данных покупателя
  setCustomerInfo(customerInfo: Partial<ICustomer>): void {
    if (customerInfo.payment !== undefined) {
      this.customerInfo.payment = customerInfo.payment;
    }
    if (customerInfo.email !== undefined) {
      this.customerInfo.email = customerInfo.email;
    }
    if (customerInfo.address !== undefined) {
      this.customerInfo.address = customerInfo.address;
    }
    if (customerInfo.phone !== undefined) {
      this.customerInfo.phone = customerInfo.phone;
    }
    this.events.emit(actions.CUSTOMER_UPDATE);
  }

  // Получить данные покупателя
  getCustomerInfo(): ICustomer {
    return this.customerInfo;
  }

  // Очистить данные покупателя
  eraseCustomerInfo(): void {
    this.customerInfo = {
      payment: null,
      email: "",
      phone: "",
      address: "",
    };
  }

  // Проверка корректности данных
  isCorrect(): { [key in keyof ICustomer]?: string } {
    let errors: { [key in keyof ICustomer]?: string } = {};
    if (!this.customerInfo.payment) {
      errors.payment = "Укажите тип оплаты";
    }
    if (!this.customerInfo.email) {
      errors.email = "Укажите email-адрес";
    }
    if (!this.customerInfo.address) {
      errors.address = "Укажите адрес покупателя";
    }
    if (!this.customerInfo.phone) {
      errors.phone = "Укажите номер телефона";
    }

    return errors;
  }
}

export default Customer;