import { IEvents } from "../base/Events";
import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { actions } from "../../utils/actions";


// Интерфейс для состояния корзины
interface IBasket {
  listItems: HTMLElement[];
  totalPrice: number;
  isToOrderButtonDisabled: boolean;
}

// Компонент корзины покупок
export class Cart extends Component<IBasket> {
  totalElement: HTMLElement;
  toOrderButton: HTMLButtonElement;
  cartList: HTMLElement;

  constructor(private events: IEvents, container: HTMLElement) {
    super(container);
    // Инициализация DOM элементов
    this.totalElement = ensureElement(".basket__price", this.container);
    this.toOrderButton = ensureElement<HTMLButtonElement>(
      ".basket__button",
      this.container
    );
    this.cartList = ensureElement(".basket__list", this.container);
    
    // Обработчик кнопки оформления заказа
    this.toOrderButton.addEventListener("click", () => {
      this.events.emit(actions.MAKE_ORDER);
    });
  }

  // Установка состояния кнопки оформления заказа
  set isToOrderButtonDisabled(value: boolean) {
    this.toOrderButton.disabled = value;
  }

  // Обновление списка товаров в корзине
  set listItems(list: HTMLElement[]) {
    this.cartList.replaceChildren(...list);
  }

  // Установка общей суммы заказа
  set totalPrice(price: number) {
    this.totalElement.textContent = `${price} синапсов`;
  }
}