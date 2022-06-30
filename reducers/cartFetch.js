export default (carts = {}, action) => {
  switch (action.type) {
    case "FETCH_CART":
      return action.payload;
    default:
      return carts;
  }
};
