https://github.com/Rokki0710/weblarek.git

# Проектная работа "Веб-ларек"

**Стек:** HTML, SCSS, TypeScript, Vite

## Важные файлы

- `index.html` — HTML-файл главной страницы
- `src/types/index.ts` — файл с типами данных
- `src/main.ts` — точка входа приложения
- `src/scss/styles.scss` — корневой файл стилей
- `src/utils/constants.ts` — файл с константами
- `src/utils/utils.ts` — файл с утилитами
- `src/utils/actions.ts` — перечисление событий

## Установка и запуск

### Установка зависимостей
```npm install```

### Запуск в режиме разработки
```npm run dev```

### Сборка проекта
```npm run build```

## Интернет-магазин «Web-Larek»

«Web-Larёk» — это интернет-магазин с товарами для веб-разработчиков, где пользователи могут просматривать товары, добавлять их в корзину и оформлять заказы. Сайт предоставляет удобный интерфейс с модальными окнами для просмотра деталей товаров, управления корзиной и выбора способа оплаты, обеспечивая полный цикл покупки с отправкой заказов на сервер.

## Архитектура приложения

Код приложения разделен на слои согласно парадигме **MVP (Model-View-Presenter)**, которая обеспечивает четкое разделение ответственности между классами слоев Model и View. Каждый слой несет свой смысл и ответственность:

- **Model** - слой данных, отвечает за хранение и изменение данных
- **View** - слой представления, отвечает за отображение данных на странице
- **Presenter** - содержит основную логику приложения и отвечает за связь представления и данных

Взаимодействие между классами обеспечивается использованием **событийно-ориентированного подхода**. Модели и Представления генерируют события при изменении данных или взаимодействии пользователя с приложением, а Презентер обрабатывает эти события, используя методы как Моделей, так и Представлений.

## Базовый код

### Класс Component

Является базовым классом для всех компонентов интерфейса. Класс является дженериком и принимает в переменной `T` тип данных, которые могут быть переданы в метод `render` для отображения.

**Конструктор:**  
`constructor(container: HTMLElement)` - принимает ссылку на DOM элемент, за отображение которого он отвечает

**Поля класса:**  
- `container: HTMLElement` - поле для хранения корневого DOM элемента компонента

**Методы класса:**  
- `render(data?: Partial<T>): HTMLElement` - главный метод класса. Принимает данные, которые необходимо отобразить в интерфейсе, записывает эти данные в поля класса и возвращает ссылку на DOM-элемент
- `setImage(element: HTMLImageElement, src: string, alt?: string): void` - утилитарный метод для модификации DOM-элементов `<img>`

### Класс Api

Содержит в себе базовую логику отправки запросов.

**Конструктор:**  
`constructor(baseUrl: string, options: RequestInit = {})` - в конструктор передается базовый адрес сервера и опциональный объект с заголовками запросов

**Поля класса:**  
- `baseUrl: string` - базовый адрес сервера
- `options: RequestInit` - объект с заголовками, которые будут использованы для запросов

**Методы:**  
- `get<T extends object>(uri: string): Promise<T>` - выполняет GET запрос на переданный в параметрах ендпоинт и возвращает промис с объектом, которым ответил сервер
- `post<T extends object>(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<T>` - принимает объект с данными, которые будут переданы в JSON в теле запроса, и отправляет эти данные на ендпоинт, переданный как параметр при вызове метода. По умолчанию выполняется `POST` запрос, но метод запроса может быть переопределен заданием третьего параметра при вызове
- `handleResponse<T>(response: Response): Promise<T>` - защищенный метод, проверяющий ответ сервера на корректность и возвращающий объект с данными, полученный от сервера, или отклоненный промис в случае некорректных данных

### Класс EventEmitter

Брокер событий реализует паттерн "Наблюдатель", позволяющий отправлять события и подписываться на события, происходящие в системе. Класс используется для связи слоя данных и представления.

**Конструктор:**  
Не принимает параметров

**Поля класса:**  
- `_events: Map<string | RegExp, Set<Function>>` - хранит коллекцию подписок на события. Ключи коллекции - названия событий или регулярное выражение, значения - коллекция функций обработчиков, которые будут вызваны при срабатывании события

**Методы класса:**  
- `on<T extends object>(event: EventName, callback: (data: T) => void): void` - подписка на событие, принимает название события и функцию-обработчик
- `emit<T extends object>(event: string, data?: T): void` - инициализация события. При вызове события в метод передается название события и объект с данными, который будет использован как аргумент для вызова обработчика
- `trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void` - возвращает функцию, при вызове которой инициализируется требуемое в параметрах событие с передачей в него данных из второго параметра
- `off(eventName: EventName, callback: Subscriber): void` - отписка от события
- `onAll(callback: (event: EmitterEvent) => void): void` - подписка на все события
- `offAll(): void` - сброс всех обработчиков

## Данные

### Интерфейсы

**IProduct** - описывает товар, представленный в каталоге магазина:
```typescript
interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}
```

**ICustomer** - описывает данные покупателя, которые он вводит при оформлении заказа:
```typescript
interface ICustomer {
  payment?: 'cash' | 'card' | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
}
```

**IOrder** - описывает данные, отправляемые на сервер при создании заказа (интерфейс на основе ICustomer):
```typescript
interface IOrder extends ICustomer {
  total: number;
  items: string[];
}
```

**IOrderResponse** - описывает данные, возвращаемые сервером в ответ на отправку данных заказа:
```typescript
interface IOrderResponse {
  id: string;
  total: number;
}
```

**ICardActions** - описывает действия для карточек товара:
```typescript
interface ICardActions {
  onClick(): void;
}
```

## Модели данных

Для учета данных в приложении реализованы 3 класса, которые разделены между собой по смыслу и зонам ответственности.

### Класс Product

**Назначение:** хранение товаров, которые можно купить в приложении. Хранит массив всех товаров и товар, выбранный для подробного отображения.

**Конструктор:**  
`constructor(private events: IEvents)` - принимает брокер событий для уведомления об изменениях

**Поля класса:**  
- `protected items: IProduct[] = []` - массив всех товаров
- `protected selectedItem: IProduct | null = null` - выбранный товар для детального просмотра

**Методы класса:**  
- `setItem(items: IProduct[]): void` - сохранение массива товаров, полученного в параметрах метода
- `getItem(): IProduct[]` - получение массива товаров из модели
- `getItemByID(id: string): IProduct | undefined` - получение одного товара по его id
- `setSelectedItem(chosenItem: IProduct | null): void` - сохранение выбранного товара для подробного отображения
- `getSelectedItem(): IProduct | null` - получение выбранного товара для подробного отображения

### Класс Cart

**Назначение:** хранение товаров, которые пользователь выбрал для покупки.

**Конструктор:**  
`constructor(private events: IEvents)` - принимает брокер событий для уведомления об изменениях

**Поля класса:**  
- `private addedProduct: IProduct[] = []` - массив товаров в корзине

**Методы класса:**  
- `getItems(): IProduct[]` - получение массива товаров, которые находятся в корзине
- `addToCart(addedProduct: IProduct): void` - добавление товара в массив корзины
- `removeFromCart(productID: string): void` - удаление товара из массива корзины по id
- `removeAllItems(): void` - очистка корзины
- `getTotalCost(): number` - получение стоимости всех товаров в корзине
- `getAmountOfItems(): number` - получение количества товаров в корзине
- `isAvailable(productID: string): boolean` - проверка наличия товара в корзине по его id

### Класс Customer

**Назначение:** данные покупателя, которые тот должен указать при оформлении заказа.

**Конструктор:**  
`constructor(private events: IEvents)` - принимает брокер событий для уведомления об изменениях

**Поля класса:**  
```typescript
private customerInfo: ICustomer = {
  payment: null,
  email: null,
  phone: null,
  address: null,
};
```

**Методы класса:**  
- `setCustomerInfo(customerInfo: Partial<ICustomer>): void` - частично (или полностью) обновляет данные клиента, применяя только определенные поля из входного объекта customerInfo
- `getCustomerInfo(): ICustomer` - возвращает данные покупателя
- `eraseCustomerInfo(): void` - очищает данные покупателя
- `isCorrect(): { [key in keyof ICustomer]?: string }` - валидация данных покупателя, возвращает объект с ошибками

## Слой коммуникации

### Класс ApiService

Класс является представителем коммуникационного слоя. Он отвечает за получение данных с сервера и отправку данных на сервер.

**Конструктор:**  
`constructor(Api: IApi)` - принимает объект, соответствующий интерфейсу IApi, и сохраняет его в поле

**Методы класса:**  
- `async getProducts(): Promise<IProduct[]>` - выполняет асинхронный запрос на сервер и получает массив товаров. Предусмотрена обработка ошибок с возвратом пустого массива
- `postOrder(order: IOrder): Promise<IOrderResponse>` - отправляет на сервер данные о заказе (объект order, соответствующий интерфейсу IOrder), возвращает ответ сервера в виде объекта IOrderResponse

## Слой представления

### Класс PageHeader

**Назначение класса:** шапка страницы. Содержит в себе кнопку корзины и счетчик товаров.

**Конструктор класса:**  
`constructor(protected events: IEvents, container: HTMLElement)`

**Поля класса:**  
- `protected counterElement: HTMLElement` - элемент счетчика товаров
- `protected basketButton: HTMLElement` - кнопка корзины

**Методы класса:**  
- `set counter(value: number)` - принимает числовое значение счетчика товаров в корзине и записывает его

### Класс Gallery

**Назначение класса:** окно вывода карточек товаров.

**Конструктор класса:**  
`constructor(protected Events: IEvents, container: HTMLElement)`

**Поля класса:**  
- `protected container: HTMLElement` - контейнер для карточек товаров

**Методы класса:**  
- `set catalog(cardList: HTMLElement[])` - принимает массив карточек и выводит их в галерее

### Класс Modal

**Назначение класса:** модальное окно.

**Конструктор класса:**  
`constructor(protected events: IEvents, container: HTMLElement)`

**Поля класса:**  
- `modalContent: HTMLElement` - контейнер для содержимого модального окна
- `closeButton: HTMLElement` - кнопка закрытия

**Методы класса:**  
- `set content(modalElement: HTMLElement)` - принимает HTML-элемент с содержимым модального окна
- `open(content: HTMLElement)` - открывает модальное окно с переданным содержимым
- `close()` - закрывает модальное окно

### Класс CardDefault (абстрактный)

**Назначение класса:** базовая карточка товара.

**Конструктор класса:**  
`constructor(container: HTMLElement)`

**Поля класса:**  
- `protected title: HTMLElement` - элемент заголовка товара
- `protected price: HTMLElement` - элемент цены товара

**Методы класса:**  
- `set titleValue(value: string)` - устанавливает заголовок карточки
- `set priceValue(value: number | null)` - устанавливает цену карточки
- `render(data: Partial<IProduct>): HTMLElement` - рендерит карточку с данными товара

### Класс CatalogCard

**Назначение класса:** карточка товара, отображаемая в каталоге на главной странице.

**Конструктор класса:**  
`constructor(protected container: HTMLElement, actions?: ICardActions)`

**Поля класса:**  
- `private image: HTMLImageElement` - изображение товара
- `private category: HTMLElement` - элемент категории товара

**Методы класса:**  
- `set categoryValue(value: string)` - назначает категорию карточки и соответствующий CSS класс
- `set imageSrc(src: string)` - назначает изображение карточки
- `render(data: Partial<IProduct>): HTMLElement` - рендерит карточку каталога

### Класс PreviewCard

**Назначение класса:** подробная карточка товара в модальном окне.

**Конструктор класса:**  
`constructor(protected events: IEvents, container: HTMLElement)`

**Поля класса:**  
- `descriptionElement: HTMLElement` - элемент описания товара
- `cardButton: HTMLButtonElement` - кнопка действия

**Методы класса:**  
- `set description(value: string)` - назначает описание карточки
- `set buttonText(value: string)` - назначает текст кнопки
- `set isButtonDisabled(value: boolean)` - устанавливает состояние кнопки (активна/неактивна)
- `render(data: Partial<IProduct>): HTMLElement` - рендерит карточку предпросмотра

### Класс CartCard

**Назначение класса:** карточка товара, отображающаяся в корзине.

**Конструктор класса:**  
`constructor(container: HTMLElement, events?: ICardActions)`

**Поля класса:**  
- `indexElement: HTMLElement` - элемент порядкового номера
- `deleteButton: HTMLButtonElement` - кнопка удаления

**Методы класса:**  
- `set index(value: number)` - назначает порядковый номер карточки в корзине

### Класс Cart (компонент корзины)

**Назначение класса:** корзина с добавленными товарами (или пустая).

**Конструктор класса:**  
`constructor(private events: IEvents, container: HTMLElement)`

**Поля класса:**  
- `totalElement: HTMLElement` - элемент общей стоимости
- `toOrderButton: HTMLButtonElement` - кнопка оформления заказа
- `cartList: HTMLElement` - список товаров в корзине

**Методы класса:**  
- `set isToOrderButtonDisabled(value: boolean)` - назначает состояние кнопки (активна/неактивна)
- `set listItems(list: HTMLElement[])` - выводит список карточек на основе массива с карточками
- `set totalPrice(price: number)` - назначает итоговую стоимость

### Класс Confirmation

**Назначение класса:** окно подтверждения успешного заказа.

**Конструктор класса:**  
`constructor(private events: IEvents, container: HTMLElement)`

**Поля класса:**  
- `totalCostElement: HTMLElement` - элемент суммы заказа
- `closeButton: HTMLButtonElement` - кнопка закрытия

**Методы класса:**  
- `set total(value: number)` - назначает сумму заказа

### Класс FormDefault (абстрактный)

**Назначение класса:** абстрактный родительский класс формы.

**Конструктор класса:**  
`constructor(container: HTMLElement)`

**Поля класса:**  
- `submitButton: HTMLButtonElement` - кнопка отправки формы
- `errorsElement: HTMLElement` - элемент для отображения ошибок

**Методы класса:**  
- `set isButtonDisabled(value: boolean)` - назначает состояние кнопки (активна/неактивна)
- `set errorMessage(message: string)` - назначает содержимое блока с ошибками

### Класс FormOrder

**Назначение класса:** форма для выбора способа оплаты и адреса доставки.

**Конструктор класса:**  
`constructor(protected events: IEvents, container: HTMLElement)`

**Поля класса:**  
- `cashButton: HTMLButtonElement` - кнопка "Оплата наличными"
- `cardButton: HTMLButtonElement` - кнопка "Оплата картой"
- `addressElement: HTMLInputElement` - поле ввода адреса

**Методы класса:**  
- `set payment(value: TPayment)` - назначает тип оплаты
- `set address(value: string)` - назначает адрес

### Класс ContactForm

**Назначение класса:** форма ввода контактных данных.

**Конструктор класса:**  
`constructor(protected events: IEvents, container: HTMLElement)`

**Поля класса:**  
- `emailElement: HTMLInputElement` - поле ввода email
- `phoneElement: HTMLInputElement` - поле ввода телефона

**Методы класса:**  
- `set email(email: string)` - назначает email, введенный пользователем
- `set phone(phone: string)` - назначает телефон, введенный пользователем

## Описание событий

События на странице отслеживаются с помощью слушателей событий и обрабатываются в презентере (файл `main.ts`). Установлены слушатели на следующие события, перечисленные в файле `utils/actions.ts`:

### События корзины
  CART_OPEN - корзина открывается
  CART_UPDATE - обновление состояния корзины
  CART_ITEM_REMOVE - в корзине нажата кнопка удалить у карточки
  MAKE_ORDER - кликнули кнопку оформить в корзине

### События оформления заказа
  PAYMENT_CHOOSEN - выбор способа оплаты
  ADDRESS_INPUT - введение адреса
  EMAIL_INPUT - введение email
  PHONE_INPUT - введение телефона
  CUSTOMER_UPDATE - обновление данных пользователя
  DATA_SUBMIT - введены основные данные и продолжается оформление заказа
  CONFIRM_ORDER - введены контактные данные и завершено оформление заказа

### События завершения заказа
  ORDER_COMPLETED - заказ сделан, данные покупателя и корзины обновлены, форма закрыта

### События модальных окон
  MODAL_CLOSE - модальное окно закрывается

## Работа с API

- **Базовый URL:** `https://larek-api.nomoreparties.co/api/weblarek`
- **CDN для изображений:** `https://larek-api.nomoreparties.co/content/weblarek`
- **Методы:**
  - `GET /product` — получение каталога товаров
  - `POST /order` — оформление заказа

## Особенности реализации

1. **TypeScript** — строгая типизация всего приложения
2. **SCSS модули** — компонентный подход к стилям
3. **Event-driven архитектура** — декомпозиция логики через события
4. **Шаблонизация** — использование HTML templates для динамического рендеринга
5. **Валидация форм** — проверка данных в реальном времени
6. **Адаптивный дизайн** — поддержка мобильных устройств

## Требования к окружению

- Node.js 16+
- npm 7+
- Modern browser с поддержкой ES6+