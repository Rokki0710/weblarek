import { FormDefault } from "./DefaultForm";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { actions } from "../../utils/actions";

// Форма для ввода контактных данных
export class FormContacts extends FormDefault {
  emailElement: HTMLInputElement; // Поле для email
  phoneElement: HTMLInputElement; // Поле для телефона

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    // Получаем элементы формы
    this.emailElement = ensureElement<HTMLInputElement>(
      ".form__input[name='email']",
      this.container
    );
    this.phoneElement = ensureElement<HTMLInputElement>(
      ".form__input[name='phone']",
      this.container
    );
    
    // Обработчики ввода данных
    this.phoneElement.addEventListener("input", () =>
      this.events.emit(actions.PHONE_INPUT, this.phoneElement)
    );
    this.emailElement.addEventListener("input", () =>
      this.events.emit(actions.EMAIL_INPUT, this.emailElement)
    );
    
    // Обработчик отправки формы
    this.container.addEventListener("submit", (e?: SubmitEvent) => {
      this.events.emit(actions.DATA_SUBMIT, e);
      this.events.emit(actions.CONFIRM_ORDER, e);
    });
  }

  // Установка email
  set email(email: string) {
    this.emailElement.value = email;
  }

  // Установка телефона
  set phone(phone: string) {
    this.phoneElement.value = phone;
  }
}