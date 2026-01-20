import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { actions } from "../../utils/actions";


// Интерфейс для заголовка
interface IHeader {
  counter: number;
}

// Компонент заголовка страницы
export class Header extends Component<IHeader> {
  protected counterElement: HTMLElement; // Счетчик товаров в корзине
  protected basketButton: HTMLElement;   // Кнопка корзины

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    // Инициализация элементов заголовка
    this.counterElement = ensureElement<HTMLElement>(
      ".header__basket-counter",
      this.container
    );
    this.basketButton = ensureElement<HTMLElement>(
      ".header__basket",
      this.container
    );

    // Обработчик клика по корзине
    this.basketButton.addEventListener("click", () => {
      this.events.emit(actions.CART_OPEN);
      console.log("basket is opened");
    });
  }

  // Установка счетчика товаров
  set counter(value: number) {
    this.counterElement.textContent = String(value);
  }
}