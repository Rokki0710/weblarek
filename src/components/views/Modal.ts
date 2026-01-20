import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { IProduct } from "../../types";
import { actions } from "../../utils/actions";

// Модальное окно
export class Modal extends Component<IProduct> {
  modalContent: HTMLElement; // Контентная область модального окна
  closeButton: HTMLElement;  // Кнопка закрытия

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    // Инициализация элементов модального окна
    this.modalContent = ensureElement<HTMLElement>(
      ".modal__content",
      this.container
    );
    this.closeButton = ensureElement<HTMLElement>(
      ".modal__close",
      this.container
    );
    
    // Обработчик закрытия по кнопке
    this.closeButton.addEventListener("click", () => {
      this.events.emit(actions.MODAL_CLOSE, this.container);
      console.log("Close button clicked");
    });
    
    // Обработчик закрытия по клику вне контента
    this.container.addEventListener("click", (event) => {
      if (event.target === event.currentTarget) {
        this.events.emit(actions.MODAL_CLOSE);
      }
    });
  }

  // Установка контента модального окна
  set content(modalElement: HTMLElement) {
    this.modalContent.replaceChildren(modalElement);
  }
  
  // Открытие модального окна
  open(content: HTMLElement) {
    this.modalContent.replaceChildren(content);
    this.container.classList.add("modal_active");
  }

  // Закрытие модального окна
  close() {
    this.modalContent.replaceChildren();
    this.container.classList.remove("modal_active");
  }
}
