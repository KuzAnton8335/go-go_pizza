export const changefirstUppercase = (str) => {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

export const createRadioInput = (id, name, value, className) => {
  const input = document.createElement("input");
  input.type = "radio";
  input.classList.add(className);
  input.id = id;
  input.name = name;
  input.value = value;
}

export const createLabel = () => {

}
