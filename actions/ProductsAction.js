import Fuse from "fuse.js";
export const FetchAllProducts = (prodcs) => async (dispatch) => {
  dispatch({ type: "FETCH_ALL_PRODUCTS", payload: prodcs });
};
export const FetchProductsBySearchInput =
  (prodcs, mutable, search) => async (dispatch) => {
    if (search == "") {
      dispatch({
        type: "FETCH_PRODCS_BY_SEARCH_INPUT",
        payload: prodcs,
      });
      return prodcs;
    } else {
      let newAray = [];
      const fuse = new Fuse(prodcs, {
        keys: ["name", "price.raw", "category.name"],
        includeScore: true,
      });
      const results = fuse.search(search);
      console.log(results);
      results.map((prod) => {
        newAray.push(prod.item);
      });
      const characterResults = newAray.map((character) => character);
      dispatch({
        type: "FETCH_PRODCS_BY_SEARCH_INPUT",
        payload: characterResults,
      });
      return characterResults;
    }
  };

export const FetchProductByCategory =
  (prodcs, mutable, category) => async (dispatch) => {
    if (category == "wszystko") {
      dispatch({
        type: "FETCH_PRODCS_BY_CATEGORY",
        payload: prodcs,
      });
      return prodcs;
    } else {
      dispatch({
        type: "FETCH_PRODCS_BY_CATEGORY",
        payload: prodcs.filter((item) => {
          if (item?.categories[0]?.slug == category) {
            return item;
          }
        }),
      });
      return prodcs.filter((item) => {
        if (item?.categories[0]?.slug == category) {
          return item;
        }
      });
    }
  };

export const FetchProductByPriceSearch =
  (prodcs, mutable, price) => async (dispatch) => {
    if (price == "natywnie") {
      dispatch({
        type: "FETCH_PRODCS_BY_PRICE",
        payload: prodcs,
      });
      return prodcs;
    } else {
      if (price == "rosnąco") {
        function compareNumbersDown(a, b) {
          const FirstVal = a.price.raw;
          const SecondVal = b.price.raw;
          return FirstVal - SecondVal;
        }
        dispatch({
          type: "FETCH_PRODCS_BY_PRICE",
          payload: mutable.sort(compareNumbersDown),
        });
        return mutable.sort(compareNumbersDown);
      } else if (price == "malejąco") {
        function compareNumbersUp(a, b) {
          const FirstVal = a.price.raw;
          const SecondVal = b.price.raw;
          return SecondVal - FirstVal;
        }
        dispatch({
          type: "FETCH_PRODCS_BY_PRICE",
          payload: mutable.sort(compareNumbersUp),
        });
        return mutable.sort(compareNumbersUp);
      }
    }
  };
