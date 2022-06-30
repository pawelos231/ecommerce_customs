
export default (carts = { cart: 0 }, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...carts, cart: action.payload };
    default:
      return carts;
  }
};
