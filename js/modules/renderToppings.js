import { getData } from "./getData.js";
import { renderPizza } from "./renderPizza.js";

export const renderToppings = async () => {
  const { en: enToppings, ru: ruToppings } = await getData("https://curly-melted-eclipse.glitch.me/api/toppings");
  const toppingsList = document.querySelector(".toppings__list");
  toppingsList.textContent = "";
  const items = enToppings.map((enName, i) => {
    const item = document.createElement("li");
    item.classList.add("toppings__item");
    item.innerHTML = `
		<input type="checkbox" class="toppings__checkbox" name="topping" value="${enName}" id="${enName}">
		<label class="toppings__label" for="${enName}">
			${ruToppings[i][0].toUpperCase()}${ruToppings[i].slice(1).toLowerCase()}
		</label>
		`
    return item;
  })


  const itemReset = document.createElement("li");
  itemReset.classList.add("toppings__item");
  const btnReset = document.createElement("button");
  btnReset.classList.add("toppings__reset");

  btnReset.textContent = "Сбросить";
  btnReset.type = "reset";

  itemReset.append(btnReset);

  toppingsList.append(...items, itemReset);



  const toppingsForm = document.querySelector(".toppings__form");

  toppingsForm.addEventListener("change", (e) => {
    e.preventDefault();
    const checkedToppings = [];
    const formData = new FormData(toppingsForm);
    for (const [, value] of formData.entries()) {
      checkedToppings.push(value);
    }
    renderPizza(checkedToppings);

    if (checkedToppings.length) {
      toppingsList.append(itemReset);
    } else {
      itemReset.remove();
    }
  })

  btnReset.addEventListener("click", (e) => {
    e.preventDefault();
    itemReset.remove();
    toppingsForm.reset();
    renderPizza();
  })
}
