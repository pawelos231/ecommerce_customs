export const SwitchMode = (name) => async (dispatch) => {
  dispatch({ type: "SWITCH_BUTTON", payload: name });
};
