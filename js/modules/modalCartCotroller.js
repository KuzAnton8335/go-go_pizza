import { cartContorl } from "./cartControl.js";
import { getData } from "./getData.js";
import { changefirstUppercase } from "./helpers.js";

// получение элементов окна карзины
const cartListElem = document.querySelector(".modal-cart__list");
const cartPriceElem = document.querySelectorAll(".modal-cart__price");
const nextBtn = document.querySelector(".modal-cart__continue");
const prevBtn = document.querySelector(".modal-cart__prev");
const submitBtn = document.querySelector(".modal-cart__send-order");
const CartBlockElem = document.querySelector(".modal-cart__block")
const CartDeliveryElem = document.querySelector(".modal-cart__delivery");
const cartForm = document.querySelector(".modal-cart__form");

// функция формирования списка корзины
const renderCartList = async (e) => {
  let totalPrice = 0;// Начальная цена корзины
  // получение данных из localStorage и преобразование в Promise
  if (cartContorl.cartData.length) {
    cartListElem.textContent = "";// очистка списка товаров корзины
    nextBtn.disabled = false;// включение кнопки "Далее"

    const cartsDataPromises = cartContorl.cartData.map(async item => await getData(`https://curly-melted-eclipse.glitch.me/api/products/${item.id}`));// получение данных из API и преобразование в Promise
    const cartData = await Promise.all(cartsDataPromises);// объединение Promises;

    //формирование карты из cartData
    const cartsCart = cartData.map((data, i) => {
      //получение данных из localStorage(data)
      //получение индекса данных(i)
      const item = cartContorl.cartData[i];
      // формирование карты (список li)
      const cardCart = document.createElement("li");
      cardCart.classList.add("modal-cart__item");
      cardCart.innerHTML = `
        <picture>
        <source srcset="${data.images[1]}" type="image/webp">
        <img class="modal-cart__image" src="${data.images[0]}" width="63" height="63"
          alt="${data.name.ru}">
      </picture>

      <div class="modal-cart__content">
        <h3 class="modal-cart__title-pizza">${changefirstUppercase(data.name.ru)}</h3>
        <p class="modal-cart__info-pizza">
          <span class="modal-cart__price-pizza">${data.price[item.size]} ₽</span>
          <span>/</span>
          <span class="modal-cart__weight-pizza">${parseInt(item.size)}</span>
        </p>
      </div>
      <button class="modal-cart__delete-button" data-id="${item.cartId}">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.4549 4.01401C11.3985 4.00992 11.3805 4.01242 11.3579 3.99904L11.3522 3.43064C11.2979 3.41032 11.2015 3.42189 11.1407 3.42189L8.70136 3.42086V4.01348L7.73452 4.01392L7.73349 3.00582C7.73333 2.72455 7.65345 2.33685 8.03552 2.29858L11.7298 2.30315C12.0624 2.30324 12.3344 2.23977 12.3353 2.69883L12.3345 4.01423L11.4549 4.01401Z"
            fill="#C1AB91"></path>
          <path
            d="M15.3507 16.174C15.2392 16.6674 14.9551 17.2592 14.3936 17.3414C14.2455 17.363 14.0776 17.3491 13.9275 17.3492L6.00015 17.3485C5.65702 17.3475 5.40171 17.3159 5.14284 17.0553C4.5339 16.4421 4.61993 15.4641 4.61956 14.6723L4.61746 6.06336C4.59609 6.03136 4.48624 6.05367 4.44859 6.05367L3.77281 6.05352C3.38871 6.05317 3.35065 6.03086 3.34968 5.60977C3.34937 5.46586 3.30965 5.12292 3.37262 5.00142L3.39212 4.96339C3.43021 4.89298 3.48177 4.85839 3.55674 4.8362L16.0585 4.83686C16.2029 4.83683 16.3554 4.82702 16.4991 4.83989C16.7356 4.86105 16.7032 5.09483 16.7041 5.24905L16.7068 5.78127C16.7066 6.08752 16.4049 6.05405 16.1876 6.0542L15.4515 6.05336C15.4305 6.06827 15.4378 6.29108 15.4377 6.32805L15.4364 15.1909C15.4362 15.5305 15.4155 15.8385 15.3507 16.174ZM12.5871 8.00598L12.5891 14.863L13.9216 14.8637L13.9259 8.00652L12.9954 8.00552C12.8661 8.00536 12.7147 7.98989 12.5871 8.00598ZM6.12246 8.00611L6.12071 14.8636L7.45806 14.8637L7.45331 8.00689L6.12246 8.00611ZM9.34309 8.00598L9.34699 14.6687C9.34709 14.7314 9.34087 14.8014 9.35162 14.8628L10.6999 14.8599L10.7015 8.01195C10.6744 7.99998 10.6332 8.00592 10.6035 8.00592L9.34309 8.00598Z"
            fill="#C1AB91"></path>
        </svg>
      </button>
        `;
      // добавление стоимости в цену(price)
      totalPrice += data.price[item.size];
      return cardCart;
    })
    cartListElem.append(...cartsCart);

  } else {
    cartListElem.textContent = 'Корзина пуста...';// сообщение корзина пуста
    nextBtn.disabled = true;// выключение кнопки "Далее";
  }
  // расчет цены (всех пицц в окне) и вывод в конце окна.
  cartPriceElem.forEach(elem => elem.textContent = `${totalPrice} ₽`)

}

const delCartItem = (e) => {
  const deleteButton = e.target.closest('.modal-cart__delete-button');
  if (deleteButton) {
    const cartId = deleteButton.dataset.id;
    cartContorl.removeCart(cartId);
    renderCartList();
  }
}

const changeNextBlock = () => {
  CartBlockElem.style.display = 'none';
  CartDeliveryElem.style.display = 'block';
}

const changePrevBlock = () => {
  CartBlockElem.style.display = 'block';
  CartDeliveryElem.style.display = 'none';
}

const submintOrder = async (e) => {
  async (e) => {
    e.preventDefault();
    // формирование данных
    const formData = new FormData(cartForm);
    const data = Object.fromEntries(formData);
    data.pizzas = cartContorl.cartData;
    // обработка ошибок при отправке данных на сервер
    try {
      const respons = await fetch(`https://curly-melted-eclipse.glitch.me/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
      if (!respons.ok) {
        throw new Error('Ошибка при отправке данных');
      }
      const order = await respons.json();
      cartContorl.clearCart();
      cartForm.innerHTML = `
    <h3>Заказ оформлен, номер заказа ${order.orderId}</h3>
    `;
      [nextBtn, prevBtn, submitBtn].forEach((btn) => btn.disabled = true);

    } catch (err) {
      console.error(`Error submiting order:${err}`);
    }
  }

}

export const modalCartController = () => {
  renderCartList();
  // функция очистки модального окна корзины по клику на кнопку "Удалить"
  cartListElem.addEventListener('click', delCartItem);
  // функция перехода на форму заказа  модального окна корзины по клику на кнопку "Далее"
  nextBtn.addEventListener('click', changeNextBlock)
  prevBtn.addEventListener('click', changePrevBlock)

  // функция добавления данных из формы модального окна на сервер
  cartForm.addEventListener('submint', submintOrder)
}