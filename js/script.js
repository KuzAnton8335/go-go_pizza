import { renderPizza } from "./modules/renderPizza.js";
import { renderToppings } from "./modules/renderToppings.js";
import { toppingToggle } from "./modules/toppingToggle.js";


const init = () => {
	toppingToggle();
	renderToppings();
	renderPizza();
}

init();