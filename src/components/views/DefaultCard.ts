import { Component } from "../base/Component";
import { IProduct } from "../../types/index";
import { ensureElement } from "../../utils/utils";


// Базовый класс для карточек товаров
export abstract class CardDefault extends Component<IProduct> {
  protected title: HTMLElement; // Заголовок товара
  protected price: HTMLElement; // Цена товара

  constructor(container: HTMLElement) {
    super(container);
    // Получаем элементы из DOM
    this.title = ensureElement<HTMLElement>(".card__title", this.container);
    this.price = ensureElement<HTMLElement>(".card__price", this.container);
  }

  // Установка заголовка
  set titleValue(value: string) {
    if (this.title) {
      this.title.textContent = value;
    }
  }

  // Установка цены
  set priceValue(value: number | null) {
    if (this.price) {
      this.price.textContent =
        value === null ? `Бесценно` : `${value} синапсов`;
    }
  }

  // Рендеринг карточки
  render(data: Partial<IProduct>): HTMLElement {
    if (data.title !== undefined) {
      this.titleValue = data.title;
    }
    if (data.price !== undefined) {
      this.priceValue = data.price;
    }
    return this.container;
  }
}