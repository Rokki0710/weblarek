import { ICustomer} from "../../types"; 
import { actions } from "../../utils/actions"; 
import { IEvents } from "../base/Events"; 
 
// Класс для работы с данными покупателя 
export class Customer { 
  private customerInfo: ICustomer = {
    payment: "card", // по умолчанию "наличными"
    email: "",
    phone: "",
    address: "",
};
 
  constructor(private events: IEvents) {} 
 
  // Обновление данных покупателя 
  setCustomerInfo(customerInfo: Partial<ICustomer>): void { 
    this.customerInfo = { ...this.customerInfo, ...customerInfo }; 
    this.events.emit(actions.CUSTOMER_UPDATE); 
  } 
 
  // Получить данные покупателя 
  getCustomerInfo(): ICustomer { 
    return { ...this.customerInfo }; 
  } 
 
  // Очистить данные покупателя 
  clearCustomerInfo(): void { 
    this.customerInfo = {
      payment: "card",
      email: "",
      phone: "",
      address: "",
    }; 
    this.events.emit(actions.CUSTOMER_UPDATE); 
  } 
 
  // Проверка корректности данных
  validate(): { [key in keyof ICustomer]?: string } { 
    const errors: { [key in keyof ICustomer]?: string } = {}; 
     
    if (!this.customerInfo.payment) { 
      errors.payment = "Укажите тип оплаты"; 
    } 
     
    if (!this.customerInfo.email) { 
      errors.email = "Укажите email"; 
    }
     
    if (!this.customerInfo.address) { 
      errors.address = "Укажите адрес"; 
    } 
     
    if (!this.customerInfo.phone) { 
      errors.phone = "Укажите номер телефона"; 
    }
 
    return errors; 
  } 
 
  // Проверка, все ли данные заполнены 
  isComplete(): boolean { 
    return Object.keys(this.validate()).length === 0; 
  } 
} 
 
export default Customer;