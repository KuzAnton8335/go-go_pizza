import { changefirstUppercase } from "./helpers.js";
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

  priceSizeInfo.append(priceElement, slashElement, sizeElement);

  const form = document.createElement("form");
  form.classList.add("modal-pizza__form");

  const groupFieldset = document.createElement("div");
  groupFieldset.classList.add("modal-pizza__group-fieldset");

  const fieldsetCrust = document.createElement("fieldset");
  fieldsetCrust.classList.add("modal-pizza__fieldset");

  const fieldsetSize = document.createElement("fieldset");
  fieldsetSize.classList.add("modal-pizza__fieldset");



  const addToCartBtn = document.createElement("button");
  addToCartBtn.classList.add("modal-pizza__add-cart");
  addToCartBtn.textContent = "В корзину"

  groupFieldset.append(fieldsetCrust, fieldsetSize);

  form.append(groupFieldset, addToCartBtn);

  modalPizzaMain.append(picture, title, toppingElement, priceSizeInfo, form);
}
/*
    <!--

    <p class="modal-pizza__info">
      <span class="modal-pizza__price">490 ₽</span>
      <span>/</span>
      <span class="modal-pizza__sm">25 см</span>
    </p>
    <form>
      <div class="modal-pizza__group-fieldset">
       <fieldset class="modal-pizza__fieldset">
        <input class="modal-pizza__radio" type="radio" name="crust" value="think">
        <label class="modal-pizza__label" name="crust" value="thin">Пышное тесто</label>

        <input class="modal-pizza__radio" type="radio" name="crust" value="think" checked>
        <label class="modal-pizza__label" name="crust" value="thin">Тонкое тесто</label>
       </fieldset>

       <fieldset class="modal-pizza__fieldset">
        <input class="modal-pizza__radio" type="radio" name="size" value="25 cm" checked>
        <label class="modal-pizza__label">25 см</label>

        <input class="modal-pizza__radio" type="radio" name="size" value="30 cm">
        <label class="modal-pizza__label">30 см</label>

        <input class="modal-pizza__radio" type="radio" name="size" value="35 cm">
        <label class="modal-pizza__label">35 см</label>
       </fieldset>
      </div>
      <button class="modal-pizza__add-cart" type="button">В корзину</button>
    </form>
    <button class="modal__close">
      <svg width="20.000000" height="20.000000" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
       xmlns:xlink="http://www.w3.org/1999/xlink">
       <rect id="close" width="20.000000" height="20.000000" fill="#FFFFFF" fill-opacity="0" />
       <rect id="Rectangle 10" x="14.833252" y="4.000000" width="0.851136" height="15.320445"
        transform="rotate(45 14.833252 4.000000)" fill="#C1AB91" fill-opacity="1.000000" />
       <rect id="Rectangle 11" x="4.000000" y="4.601807" width="0.851136" height="15.320445"
        transform="rotate(-45 4.000000 4.601807)" fill="#C1AB91" fill-opacity="1.000000" />
      </svg>
    </button>
 */
