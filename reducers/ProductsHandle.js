export default (state = { prodcs: [] }, action) => {
  switch (action.type) {
    case "FETCH_ALL_PRODUCTS":
      return { ...state, prodcs: action.payload };
    case "FETCH_PRODCS_BY_SEARCH_INPUT":
      return { ...state, prodcs: action.payload };
    case "FETCH_PRODCS_BY_CATEGORY":
      return { ...state, prodcs: action.payload };
    case "FETCH_PRODCS_BY_PRICE":
      return { ...state, prodcs: action.payload };
    default:
      return state;
  }
};
