
// функция записи данных (product) в localStorage
export const cartContorl = {
  cartData: JSON.parse(localStorage.getItem('cart') || '[]'),
  addCart(product) {
    this.cartData.push(product);
    localStorage.setItem("cart", JSON.stringify(this.cartData))
  },
  // удаление данных из localStorage (product) по cartId (cartId)
  removeCart(cartId) {
    this.cartData = this.cartData.filter(item => item.cartId !== cartId);
    localStorage.setItem("cart", JSON.stringify(this.cartData));
  },
  //функция очистки корзины полностью
  clearCart() {
    this.cartData = [];
    localStorage.setItem("cart", JSON.stringify(this.cartData));
  }
}
