export const SwitchLanguage = (language) => async (dispatch) => {
  dispatch({ type: "SWITCH_LANGUAGE", payload: language });
};
