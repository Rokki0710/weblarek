export enum actions {
  PRODUCT_RECIEVED = "products:recieved", //ДАННЫЕ С СЕРВЕРА ПОДГРУЗИЛИСЬ
  CART_OPEN = "cart:open", //КОРЗИНКА ОТКРЫВАЕТСЯ
  MODAL_CLOSE = "modal:close", //МОДАЛЬНОЕ ОКНО ЗАКРЫВАЕТСЯ
  CARD_OPEN = "card:open", //ПРИ НАЖАТИИ НА КАРТОЧКУ, ЧТОБЫ ОТКРЫЛОСЬ ПРЕВЬЮ
  CART_UPDATE = "cart:update", //В КОРЗИНЕ
  CARD_BUTTON_CLICKED = "cardButton: clicked", //В ПРЕВЬЮ КАРТОЧКЕ ТОВАРА, КОГДА НАЖИМАЕШЬ НА КНОПКУ КУПИТЬ/УДАЛИТЬ ИЗ КОРЗИНЫ
  CART_ITEM_REMOVE = "item:removed", //в корзине кнопка удалить у карточки
  MAKE_ORDER = "orderButton:clicked", //кликнули кнопку оформить в корзине
  DATA_SUBMIT = "data: submit", //ввели основные данные и продолжаем получать заказ
  CONFIRM_ORDER = "order:confirm", //введены контактные данные и завершили оформление заказа
  ORDER_COMPLETED = "order:complete",
  PAYMENT_CHOOSEN = "payment:choosen", //выбор оплаты
  ADDRESS_INPUT = "address:input", //введение адреса
  EMAIL_INPUT = "email:input", //введение email
  PHONE_INPUT = "phone:input", //введение телефона
  CUSTOMER_UPDATE = "customer:update", //следим за обновлением данных пользователя
}
