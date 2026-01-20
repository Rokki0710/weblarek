import { FormDefault } from "./DefaultForm";
import { TPayment } from "../../types/index";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { actions } from "../../utils/actions";


// Форма оформления заказа
export class FormOrder extends FormDefault {
  cashButton: HTMLButtonElement;   // Кнопка "наличными"
  cardButton: HTMLButtonElement;   // Кнопка "картой"
  addressElement: HTMLInputElement; // Поле для адреса

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    // Инициализация элементов формы
    this.cashButton = ensureElement<HTMLButtonElement>(
      ".button[name='cash']",
      this.container
    );
    this.cardButton = ensureElement<HTMLButtonElement>(
      ".button[name='card']",
      this.container
    );
    this.addressElement = ensureElement<HTMLInputElement>(
      ".form__input",
      this.container
    );
    
    // Обработчики выбора способа оплаты
    this.cardButton.addEventListener("click", () => {
      this.events.emit(actions.PAYMENT_CHOOSEN, this.cardButton);
    });
    this.cashButton.addEventListener("click", () => {
      this.events.emit(actions.PAYMENT_CHOOSEN, this.cashButton);
    });
    
    // Обработчик ввода адреса
    this.addressElement.addEventListener("input", () => {
      this.events.emit(actions.ADDRESS_INPUT, this.addressElement);
    });
    
    // Обработчик отправки формы
    this.container.addEventListener("submit", (e?: SubmitEvent) => {
      this.events.emit(actions.DATA_SUBMIT, e);
    });
  }

  // Установка выбранного способа оплаты
  set payment(value: TPayment) {
    this.cardButton.classList.toggle(
      "button_alt-active",
      this.cardButton.name === value
    );
    this.cashButton.classList.toggle(
      "button_alt-active",
      this.cashButton.name === value
    );
  }

  // Установка адреса доставки
  set address(value: string) {
    this.addressElement.value = value;
  }
}