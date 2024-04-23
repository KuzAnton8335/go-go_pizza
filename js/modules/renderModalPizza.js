import { cartContorl } from "./cartControl.js";
import { changefirstUppercase, createLabel, createRadioInput } from "./helpers.js";

export const renderModalPizza = ({ id, images, name, price, toppings }) => {
  const modalPizzaMain = document.querySelector('.modal-pizza__main');
  modalPizzaMain.textContent = '';

  // размер цены пиццы для вставки в верстку
  let size = Object.keys(price)[0];

  // верстка фото пиццы для вставки в верстку(в webp)
  const picture = document.createElement('picture');
  const source = document.createElement('source');
  source.srcset = images[1];
  source.type = 'image/webp';


  // верстка фото пиццы для вставки в верстку(в png)
  const img = document.createElement('img');
  img.classList.add('modal-pizza__img');
  img.src = images[0];
  img.alt = name.ru;
  picture.append(source, img);

  // верстка заголовки пиццы для вставки в верстку
  const title = document.createElement('h2');
  title.classList.add('modal-pizza__title');
  title.textContent = changefirstUppercase(name.ru);

  // верстка характеристика  пиццы для вставки в верстку
  const toppingElement = document.createElement('p');
  toppingElement.classList.add('modal-pizza__tippings');
  toppingElement.textContent = changefirstUppercase(toppings.ru);

  const priceSizeInfo = document.createElement('p');
  priceSizeInfo.classList.add('modal-pizza__info');

  const priceElement = document.createElement('span');
  priceElement.classList.add("modal-pizza__price");
  const slashElement = document.createElement('span');
  slashElement.textContent = `/`
  const sizeElement = document.createElement('span');
  sizeElement.classList.add("modal-pizza__sm");

  //функция вставки цены и размера пиццы через форму/input[name="size"]
  const updatePrice = () => {
    const selectedSizeInput = form.querySelector('input[name="size"]:checked');
    size = selectedSizeInput.value;
    priceElement.textContent = `${price[size]} ₽`;
    sizeElement.textContent = `${parseInt(size)} см
    `;
  };

  priceSizeInfo.append(priceElement, slashElement, sizeElement);

  // create form - создание формы
  const form = document.createElement("form");
  form.id = id;
  form.classList.add("modal-pizza__form");

  const groupFieldset = document.createElement("div");
  groupFieldset.classList.add("modal-pizza__group-fieldset");

  const fieldsetCrust = document.createElement("fieldset");
  fieldsetCrust.classList.add("modal-pizza__fieldset");

  const thickInput = createRadioInput("thick", "crust", "thick", "modal-pizza__radio");
  thickInput.checked = true;
  const thickLabel = createLabel("modal-pizza__label", "thick", "Пышное тесто");

  const thinInput = createRadioInput("thin", "crust", "thin", "modal-pizza__radio");
  const thinLabel = createLabel("modal-pizza__label", "thin", "Тонкое тесто");

  fieldsetCrust.append(thickInput, thickLabel, thinInput, thinLabel)

  const fieldsetSize = document.createElement("fieldset");
  fieldsetSize.classList.add("modal-pizza__fieldset");

  // render при помощи Object.keys и forEach
  const sizeInputs = Object.keys(price).map(size => createRadioInput(size, "size", size, "modal-pizza__radio"));
  sizeInputs[0].checked = true;
  sizeInputs.forEach(input => {
    const label = createLabel("modal-pizza__label", input.id, `${input.value} `);
    input.addEventListener('change', updatePrice)
    fieldsetSize.append(input, label);
  })

  const addToCartBtn = document.createElement("button");
  addToCartBtn.classList.add("modal-pizza__add-cart");
  addToCartBtn.textContent = "В корзину";

  groupFieldset.append(fieldsetCrust, fieldsetSize);

  form.append(groupFieldset, addToCartBtn);
  const closeBtn = document.createElement("button");
  closeBtn.classList.add("modal__close");
  closeBtn.innerHTML = `
  <svg width="20.000000" height="20.000000" viewBox="0 0 20 20" fill="none"     xmlns="http://www.w3.org/2000/svg"
   xmlns:xlink="http://www.w3.org/1999/xlink">
   <rect id="close" width="20.000000" height="20.000000" fill="#FFFFFF" fill-opacity="0" />
   <rect id="Rectangle 10" x="14.833252" y="4.000000" width="0.851136" height="15.320445"
   transform="rotate(45 14.833252 4.000000)" fill="#C1AB91" fill-opacity="1.000000" />
   <rect id="Rectangle 11" x="4.000000" y="4.601807" width="0.851136" height="15.320445"
   transform="rotate(-45 4.000000 4.601807)" fill="#C1AB91" fill-opacity="1.000000" />
 </svg>
  `
  modalPizzaMain.append(picture, title, toppingElement, priceSizeInfo, form, closeBtn);

  updatePrice();

  let timerId = NaN;
  // функция добавления в корзину товара(пиццы)
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // формирование хранилища для корзины
    const formData = new FormData(form);

    // формирование товара для карзины из input(html),присвоение для него id и cartId
    const product = {
      cartId: crypto.randomUUID(),
      id,
      crust: formData.get('crust'),
      size: formData.get('size'),
    }

    // добавление товара в localStorage при помощи функции CartControl
    cartContorl.addCart(product);

    addToCartBtn.disabled = true;
    addToCartBtn.textContent = "Добавлено";
    // время выдержки кнопки в корзине
    timerId = setTimeout(() => {
      addToCartBtn.disabled = false;
      addToCartBtn.textContent = "В корзину";
    }, 3000)
  });

  // функция что бы кнопка была "В корзину"
  form.addEventListener("change", () => {
    clearTimeout(timerId);
    addToCartBtn.disabled = false;
    addToCartBtn.textContent = "В корзину";
  });
}
