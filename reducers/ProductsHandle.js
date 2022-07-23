export default (state = { prodcs: null, numberOfPages: 1 }, action) => {
  switch (action.type) {
    case "FETCH_ALL_PRODUCTS":
      return { ...state, prodcs: action.payload };
    case "FETCH_PRODCS_BY_SEARCH_INPUT":
      return { ...state, prodcs: action.payload };
    case "FETCH_PRODCS_BY_CATEGORY":
      console.log(action.payload.data);
      return {
        ...state,
        prodcs: action.payload.data,
        numberOfPages: action.payload.PagesCount,
      };
    case "FETCH_PRODCS_BY_PRICE":
      return { ...state, prodcs: action.payload };
    default:
      return state;
  }
};
