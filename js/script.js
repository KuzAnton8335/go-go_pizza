import { modalController } from "./modules/modalController.js";
import { renderCart } from "./modules/renderCart.js";
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
      renderCart();
    }
  });
}

init();
