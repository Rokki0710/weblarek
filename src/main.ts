import "./scss/styles.scss";  
import { IProduct, TPayment, IOrder } from "./types";  
import { API_URL } from "./utils/constants";  
import { cloneTemplate, ensureElement } from "./utils/utils";  
import { actions } from "./utils/actions";  
import { Api } from "./components/base/Api";  
import { EventEmitter } from "./components/base/Events";  
import { Cart } from "./components/models/Cart";  
import { Customer } from "./components/models/Customer";  
import { Product } from "./components/models/Product";  
import { ApiService } from "./components/models/ApiService";  
import { Header } from "./components/views/PageHeader";  
import { Gallery } from "./components/views/Gallery";  
import { Modal } from "./components/views/Modal";  
import { Cart as CartLayout } from "./components/views/Cart";  
import { Confirmation } from "./components/views/OrderConfirmation";  
import { CardCatalog } from "./components/views/CatalogCard";  
import { CardPreview } from "./components/views/PreviewCard";  
import { CardCart } from "./components/views/CartCard";  
import { FormOrder } from "./components/views/OrderForm";  
import { FormContacts } from "./components/views/ContactForm";  
  
const newApi = new Api(API_URL);  
const newApiService = new ApiService(newApi);  
  
// Брокер событий для общения между компонентами  
const events = new EventEmitter();  
  
// Модели данных приложения  
const productModel = new Product(events);  
const customerModel = new Customer(events);  
const cartModel = new Cart(events);  
  
// Загрузка товаров с сервера  
newApiService  
  .getProducts()  
  .then((products) => {  
    productModel.setItems(products);  
  })  
  .catch((error) =>  
    console.error("Ошибка загрузки товаров каталога API:", error)  
  );  
  
const headerElement = ensureElement(".header");  
const header = new Header(events, headerElement);  
  
const galleryElement = ensureElement(".gallery");  
const gallery = new Gallery(events, galleryElement);  
  
const modalElement = ensureElement(".modal");  
const modal = new Modal(events, modalElement);  
events.on(actions.MODAL_CLOSE, () => {  
  modal.close();  
});  
  
const cart = new CartLayout(events, cloneTemplate("#basket"));  
  
const formOrder = new FormOrder(events, cloneTemplate("#order"));  
  
const formContacts = new FormContacts(events, cloneTemplate("#contacts"));  
  
const confirmation = new Confirmation(events, cloneTemplate("#success"));  
  
const previewCard = new CardPreview(events, cloneTemplate("#card-preview"));  
  
// Обработка загрузки товаров - создание карточек каталога  
events.on(actions.PRODUCT_RECIEVED, () => {  
  const itemsCards = productModel.getItems().map((item) => {  
    const card = new CardCatalog(cloneTemplate("#card-catalog"), {  
      onClick: () => { 
        productModel.setSelectedItem(item); 
      },  
    });  
    return card.render(item);  
  });  
  gallery.catalog = itemsCards;  
});  


// Открытие корзины  
events.on(actions.CART_OPEN, () => {  
  modal.open(cart.render());  
  if (cartModel.getAmountOfItems() === 0) {  
    cart.isToOrderButtonDisabled = true;  
  }  
});  
  
// Открытие детальной карточки товара  
events.on(actions.CARD_OPEN, () => {  
  const card = productModel.getSelectedItem(); 
  if (!card) return; 
   
  if (cartModel.isAvailable(card.id)) {  
    previewCard.buttonText = "Удалить из корзины";  
  } else {  
    previewCard.buttonText = "Купить";  
  }  
  
  if (!card.price) {  
    previewCard.buttonText = "Недоступно";  
    previewCard.isButtonDisabled = true;  
  } else {  
    previewCard.isButtonDisabled = false;  
  }  
  
  modal.open(previewCard.render(card));  
});  
  
events.on(actions.CARD_BUTTON_CLICKED, () => {  
  const item = productModel.getSelectedItem();  
  if (item) {  
    if (cartModel.isAvailable(item.id)) {  
      cartModel.removeFromCart(item.id);  
    } else {  
      cartModel.addToCart(item);  
    }  
  }  
  modal.close();  
});  
  
// Обновление отображения корзины  
events.on(actions.CART_UPDATE, () => {  
  const cartList = cartModel.getItems().map((item, index) => {  
    const cartItem = new CardCart(cloneTemplate("#card-basket"), {  
      onClick: () => {  
        events.emit(actions.CART_ITEM_REMOVE, item);  
      },  
    });  
    cartItem.index = index + 1;  
    return cartItem.render(item);  
  });  
  const cartData = {  
    listItems: cartList,  
    totalPrice: cartModel.getTotalCost(),  
    isToOrderButtonDisabled: cartList.length === 0,  
  };  
  cart.render(cartData);  
  header.render({ counter: cartModel.getAmountOfItems() });  
});  
  
events.on(actions.CART_ITEM_REMOVE, (item: IProduct) => {  
  cartModel.removeFromCart(item.id);  
});  
  
// Переход к форме заказа (адрес и оплата)  
events.on(actions.MAKE_ORDER, () => { 
  const customerData = customerModel.getCustomerInfo(); 
  const formData: any = {}; 
 
  if (customerData.payment) { 
    formData.payment = customerData.payment; 
  } 
  if (customerData.address) { 
    formData.address = customerData.address; 
  } 
   
  modal.content = formOrder.render(formData); 
  events.emit(actions.CUSTOMER_UPDATE); 
}); 
  
events.on(actions.DATA_SUBMIT, (e: SubmitEvent) => {  
  e.preventDefault();  
  const customerData = customerModel.getCustomerInfo(); 
  const formData = { 
    email: customerData.email || "", 
    phone: customerData.phone || "", 
  }; 
  modal.content = formContacts.render(formData);  
}); 
  
events.on(actions.PAYMENT_CHOOSEN, (button: HTMLButtonElement) => {  
  formOrder.payment = button.name as TPayment;  
  customerModel.setCustomerInfo({ payment: button.name as TPayment });  
});  
  
events.on(actions.ADDRESS_INPUT, (addresInput: HTMLInputElement) => {  
  customerModel.setCustomerInfo({ address: addresInput.value });  
});  
  
events.on(actions.PHONE_INPUT, (phoneInput: HTMLInputElement) => {  
  customerModel.setCustomerInfo({ phone: phoneInput.value });  
});  
  
events.on(actions.EMAIL_INPUT, (emailInput: HTMLInputElement) => {  
  customerModel.setCustomerInfo({ email: emailInput.value });  
});  
  
// Валидация данных покупателя  
events.on(actions.CUSTOMER_UPDATE, () => {  
  const validationResult = customerModel.validate(); 
  const buyerData = customerModel.getCustomerInfo(); 
   
  // Для формы заказа(адрес и оплата) 
  if (buyerData.address && buyerData.payment) { 
    formOrder.isButtonDisabled = false; 
    formOrder.errorMessage = ""; 
  } else { 
    formOrder.isButtonDisabled = true; 
    formOrder.errorMessage = `${validationResult.payment ?? ""} ${ 
      validationResult.address ?? "" 
    }`.trim(); 
  } 
   
  // Для формы контактов(телефон и email) 
  if (buyerData.phone && buyerData.email) { 
    const emailError = validationResult.email?.includes("Некорректный") ? validationResult.email : ""; 
    const phoneError = validationResult.phone?.includes("Некорректный") ? validationResult.phone : ""; 
     
    if (!emailError && !phoneError) { 
      formContacts.isButtonDisabled = false; 
      formContacts.errorMessage = ""; 
    } else { 
      formContacts.isButtonDisabled = true; 
      formContacts.errorMessage = `${phoneError} ${emailError}`.trim(); 
    } 
  } else { 
    formContacts.isButtonDisabled = true; 
    formContacts.errorMessage = `${validationResult.phone ?? ""} ${ 
      validationResult.email ?? "" 
    }`.trim(); 
  } 
});  
  
// Отправка заказа на сервер  
events.on(actions.CONFIRM_ORDER, (e: SubmitEvent) => {  
  e.preventDefault();  
   
  // Проверяем, что все данные заполнены 
  const errors = customerModel.validate(); 
  if (Object.keys(errors).length > 0) { 
    console.error("Не все данные заполнены:", errors); 
    return; 
  } 
   
  // Получаем данные покупателя 
  const customerData = customerModel.getCustomerInfo(); // ← ИЗМЕНИЛИ НА getCustomerInfo() 
   
  const orderData: IOrder = {  
    ...customerData,  
    total: cartModel.getTotalCost(),  
    items: cartModel.getItems().map((item) => item.id),  
  };  
   
  newApiService  
    .postOrder(orderData)  
    .then((response) => {  
      const orderData = response;  
      modal.content = confirmation.render(orderData);  
      cartModel.removeAllItems();  
      customerModel.clearCustomerInfo();  
    })  
    .catch((error) => {  
      console.log("Ошибка отправки заказа", error);  
    });  
}); 
  
events.on(actions.ORDER_COMPLETED, () => {  
  modal.close();  
});