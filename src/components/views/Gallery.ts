import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { IProduct } from "../../types";

// Интерфейс для галереи товаров
interface IGallery {
  cardList: IProduct[];
}

// Компонент галереи товаров
export class Gallery extends Component<IGallery> {
  constructor(protected Events: IEvents, container: HTMLElement) {
    super(container);
  }

  // Обновление каталога товаров
  set catalog(cardList: HTMLElement[]) {
    this.container.replaceChildren(...cardList);
  }
}