import { ICustomer } from "../../types/index";
import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";


// Базовый класс для форм
export abstract class FormDefault extends Component<ICustomer> {
  submitButton: HTMLButtonElement; // Кнопка отправки формы
  errorsElement: HTMLElement;     // Элемент для отображения ошибок

  constructor(container: HTMLElement) {
    super(container);
    // Инициализация элементов формы
    this.submitButton = ensureElement<HTMLButtonElement>(
      "button[type='submit']",
      this.container
    );
    this.errorsElement = ensureElement(".form__errors", this.container);
  }

  // Блокировка/разблокировка кнопки отправки
  set isButtonDisabled(value: boolean) {
    this.submitButton.disabled = value;
  }

  // Установка сообщения об ошибке
  set errorMessage(message: string) {
    this.errorsElement.textContent = message;
  }
}