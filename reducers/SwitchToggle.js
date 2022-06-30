export default (state = true, action) => {
  switch (action.type) {
    case "SWITCH_BUTTON":
      return !state;
    default:
      return state;
  }
};
