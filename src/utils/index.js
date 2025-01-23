export function totalPrice(arr) {
  return arr.reduce((acc, item) => acc + item.price * item.quantity, 0);
}
