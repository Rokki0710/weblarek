import { CardDefault } from "./DefaultCard";
import { ensureElement } from "../../utils/utils";
import { ICardActions } from "../../types/index";


// Карточка товара в корзине
export class CardCart extends CardDefault {
  indexElement: HTMLElement; // Элемент для номера позиции
  deleteButton: HTMLButtonElement; // Кнопка удаления

  constructor(container: HTMLElement, events?: ICardActions) {
    super(container);
    // Инициализация элементов карточки
    this.indexElement = ensureElement<HTMLElement>(
      ".basket__item-index",
      this.container
    );
    this.deleteButton = ensureElement<HTMLButtonElement>(
      ".basket__item-delete",
      this.container
    );
    
    // Обработчик клика на кнопку удаления
    this.deleteButton.addEventListener("click", () => {
      if (events?.onClick) {
        this.container.addEventListener("click", events.onClick);
      }
    });
  }

  // Установка порядкового номера
  set index(value: number) {
    this.indexElement.textContent = value.toString();
  }
}