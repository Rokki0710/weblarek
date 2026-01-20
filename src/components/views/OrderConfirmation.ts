import { Component } from "../base/Component";
import { IProduct } from "../../types";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";
import { actions } from "../../utils/actions";

// Компонент подтверждения заказа
export class Confirmation extends Component<IProduct> {
  totalCostElement: HTMLElement;    // Элемент для отображения суммы
  closeButton: HTMLButtonElement;   // Кнопка закрытия

  constructor(private events: IEvents, container: HTMLElement) {
    super(container);
    // Инициализация элементов
    this.closeButton = ensureElement<HTMLButtonElement>(
      ".order-success__close",
      this.container
    );
    this.totalCostElement = ensureElement<HTMLElement>(
      ".order-success__description",
      this.container
    );
    
    // Обработчик закрытия окна подтверждения
    this.closeButton.addEventListener("click", () => {
      this.events.emit(actions.ORDER_COMPLETED);
    });
  }

  // Установка общей суммы заказа
  set total(value: number) {
    this.totalCostElement.textContent = `Списано ${value} синапсов`;
  }
}