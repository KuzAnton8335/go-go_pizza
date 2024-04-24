import { modalCartController } from "./modules/modalCartCotroller.js";
import { modalController } from "./modules/modalController.js";
import { renderPizza } from "./modules/renderPizza.js";
import { renderToppings } from "./modules/renderToppings.js";
import { toppingToggle } from "./modules/toppingToggle.js";


const init = () => {
  toppingToggle();
  renderToppings();
  renderPizza();
  modalController({
    modal: ".modal-cart",
    btnOpen: ".header__cart",
    btnClose: ".modal__close",
    cbOpen() {
      modalCartController();
    }
  });

  // Добавление кнопки Заказать (.hero__order)
  modalController({
    modal: ".modal-cart",
    btnOpen: ".hero__order",
    btnClose: ".modal__close",
    cbOpen() {
      modalCartController();
    }
  });
}

init();
