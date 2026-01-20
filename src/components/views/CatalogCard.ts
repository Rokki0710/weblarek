import { CardDefault } from "./DefaultCard";
import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { CDN_URL } from "../../utils/constants";
import { categoryMap } from "../../utils/constants";
import { ICardActions } from "../../types";


// Тип для ключей категорий
type CategoryKey = keyof typeof categoryMap;

// Карточка товара в каталоге
export class CardCatalog extends CardDefault {
  private image: HTMLImageElement; // Изображение товара
  private category: HTMLElement;   // Категория товара

  constructor(protected container: HTMLElement, actions?: ICardActions) {
    super(container);
    // Инициализация элементов
    this.image = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container
    );
    this.category = ensureElement(".card__category", this.container);
    
    // Обработчик клика по карточке
    if (actions?.onClick) {
      this.container.addEventListener("click", actions.onClick);
    }
  }

  // Установка категории с соответствующим CSS классом
  set categoryValue(value: string) {
    if (this.category) {
      // Очистка предыдущих классов категорий
      Object.values(categoryMap).forEach((cls) =>
        this.category.classList.remove(cls)
      );
      const key = value as CategoryKey;
      // Добавление класса категории
      this.category.classList.add(
        key in categoryMap ? categoryMap[key] : categoryMap["другое"]
      );
      this.category.textContent = value;
    }
  }

  // Установка изображения товара
  set imageSrc(src: string) {
    const altText = this.title.textContent || ''; // преобразуем null в пустую строку
    this.setImage(this.image, `${CDN_URL}/${src}`, altText);
  }

  // Рендеринг карточки каталога
  render(data: Partial<IProduct>): HTMLElement {
    super.render(data);
    if (data.category !== undefined) this.categoryValue = data.category;
    if (data.image !== undefined) this.imageSrc = data.image;
    return this.container;
  }
}