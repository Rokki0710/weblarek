import "./scss/styles.scss";
import { ProductsModel } from "./components/models/ProductsModel";
import { CartModel } from "./components/models/CartModel";
import { BuyerModel } from "./components/models/BuyerModel";
import { apiProducts } from "./utils/data";
import { API_URL, CDN_URL, categoryMap } from "./utils/constants"; // Импорт констант

const productsModel = new ProductsModel();
const cartModel = new CartModel();
const buyerModel = new BuyerModel();

// Проверка каталога
productsModel.setItems(apiProducts.items);

console.log("Массив товаров из каталога:", productsModel.getItems());
console.log("Количество товаров:", productsModel.getItems().length);

const testProduct = productsModel.getProductById(apiProducts.items[0].id);
console.log("Товар по ID:", testProduct);

productsModel.setSelectedItem(apiProducts.items[0]);
console.log("Выбранный товар:", productsModel.getSelectedItem());

//Проверка корзины
const products = productsModel.getItems();
if (products.length > 0) {
  cartModel.addItem(products[0]);
  cartModel.addItem(products[1]);
}

console.log("Товары в корзине:", cartModel.getItems());
console.log("Количество товаров в корзине:", cartModel.getTotalCount());
console.log("Общая стоимость корзины:", cartModel.getTotalPrice());
console.log("Товар 1 в корзине?", cartModel.contains(products[0].id));

cartModel.removeItem(products[0].id);
console.log("После удаления - товары:", cartModel.getItems());
console.log("После удаления - количество:", cartModel.getTotalCount());

buyerModel.setData({ email: "test@mail.ru" });
console.log("После email:", buyerModel.getData());

buyerModel.setData({ payment: "card" });
console.log("После оплаты:", buyerModel.getData());

console.log("Ошибки (частично заполнено):", buyerModel.validate());

buyerModel.setData({ address: "Нижний Новгород", phone: "+79991234567" });
console.log("Ошибки (все заполнено):", buyerModel.validate());

buyerModel.clear();
console.log("После очистки:", buyerModel.getData());

//Тестируем работу с сервером
import { ApiService } from "./components/models/ApiService";
import { Api } from "./components/base/Api";

// Используем константу API_URL вместо прямого использования VITE_API_ORIGIN
const api = new Api(API_URL); // Исправлено: передаем API_URL вместо baseUrl
const apiService = new ApiService(api);

apiService
  .getProductList()
  .then((products) => {
    console.log("Товары с сервера:", products);

    productsModel.setItems(products);
    console.log("Товары в модели после сервера:", productsModel.getItems());
  })
  .catch((error) => {
    console.error("Ошибка получения товаров:", error);
  });
