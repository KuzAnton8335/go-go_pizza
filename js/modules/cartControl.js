// функция записи данных (product) в localStorage
export const cartContorl = {
  cartData: JSON.parse(localStorage.getItem('cart') || '[]'),
  addCart(product) {
    this.cartData.push(product);
    localStorage.setItem("cart", JSON.stringify(this.cartData))
  },
  removeCart() {
    //  метод удаления с корзины
  }
}
