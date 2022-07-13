export default (page = 1, action) => {
  switch (action.type) {
    case "SWITCH_PAGE":
      return action.payload;
    default:
      return page;
  }
};
