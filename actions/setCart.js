import { commerce } from "../lib/commerce";
export const setCart = (productId, quantity) => async (dispatch) => {
  try {
    const response = await commerce.cart.add(productId, quantity);
    dispatch({ type: "ADD_TO_CART", payload: response });
  } catch (error) {
    console.log(error);
  }
  const act = { type: "ADD_TO_CART", payload: {} };
  return act;
};
