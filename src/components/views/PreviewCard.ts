import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { CardCatalog } from "./CatalogCard";
import { IProduct } from "../../types/index";
import { actions } from "../../utils/actions";

// Карточка для предпросмотра товара
export class CardPreview extends CardCatalog {
  descriptionElement: HTMLElement;
  cardButton: HTMLButtonElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    // Инициализация элементов карточки
    this.descriptionElement = ensureElement(".card__text", this.container);
    this.cardButton = ensureElement<HTMLButtonElement>(
      ".card__button",
      this.container
    );
    
    // Обработчик клика по кнопке
    this.cardButton.addEventListener("click", () => {
      this.events.emit(actions.CARD_BUTTON_CLICKED);
    });
  }

  // Установка текста описания
  set description(value: string) {
    this.descriptionElement.textContent = value;
  }

  // Установка текста на кнопке
  set buttonText(value: string) {
    this.cardButton.textContent = value;
  }

  // Блокировка/разблокировка кнопки
  set isButtonDisabled(value: boolean) {
    this.cardButton.disabled = value;
  }

  // Рендеринг карточки с дополнительными данными
  render(data: Partial<IProduct>): HTMLElement {
    super.render(data);
    if (data.description !== undefined) this.description = data.description;
    return this.container;
  }
}