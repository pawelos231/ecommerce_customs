import { commerce } from "../lib/commerce";
export const fetchCart = () => async (dispatch) => {
  try {
    const data = await commerce.cart.retrieve();
    dispatch({ type: "FETCH_CART", payload: data });
  } catch (error) {
    console.log(error);
  }
  const action = { type: "FETCH_CART", payload: {} };
  return action;
};
