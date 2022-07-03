//i know api of commerce.js provides these sort funcitons for us (besides search by input text) but i wanted to make it as fast as possible and without fetchinh external data that would cost time
import Fuse from "fuse.js";
import {
  FETCH_PRODCS_BY_CATEGORY,
  FETCH_PRODCS_BY_SEARCH_INPUT,
  FETCH_PRODCS_BY_PRICE,
  FETCH_ALL_PRODUCTS,
} from "../constants/actionTypes";
import {
  ALL,
  ASCENDING,
  DESCENDING,
  NATIVE,
} from "../constants/SearchByInputsInMenu";
import { commerce } from "../lib/commerce";
export const FetchAllProducts = (prodcs) => async (dispatch) => {
  dispatch({ type: FETCH_ALL_PRODUCTS, payload: prodcs });
};
export const FetchProductsBySearchInput =
  (prodcs, mutable, search) => async (dispatch) => {
    if (search == "") {
      dispatch({
        type: FETCH_PRODCS_BY_SEARCH_INPUT,
        payload: prodcs,
      });
      return prodcs;
    } else {
      let newAray = [];
      const fuse = new Fuse(mutable, {
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
        type: FETCH_PRODCS_BY_SEARCH_INPUT,
        payload: characterResults,
      });
      return characterResults;
    }
  };

export const FetchProductByCategory =
  (prodcs, mutable, category) => async (dispatch) => {
    if (category == ALL) {
      dispatch({
        type: FETCH_PRODCS_BY_CATEGORY,
        payload: prodcs,
      });
      return prodcs;
    } else {
      dispatch({
        type: FETCH_PRODCS_BY_CATEGORY,
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
/*
  //EXAMPLE OF CODE BY FETCHING COMMERCE.JS API FOR FUTURE DEVELOPMENT


  export const FetchProductByCategory =
  (prodcs, mutable, category) => async (dispatch) => {
    if (category == ALL) {
      dispatch({
        type: FETCH_PRODCS_BY_CATEGORY,
        payload: prodcs,
      });
      return prodcs;
    } else {
      const { data } = await commerce.products.list({
        category_slug: [category],
      });
      dispatch({
        type: FETCH_PRODCS_BY_CATEGORY,
        payload: data,
      });
      return data;
    }
  };

  */

export const FetchProductByPriceSearch =
  (prodcs, mutable, price) => async (dispatch) => {
    if (price == NATIVE) {
      dispatch({
        type: FETCH_PRODCS_BY_PRICE,
        payload: prodcs,
      });
      return prodcs;
    } else {
      if (price == ASCENDING) {
        function compareNumbersDown(a, b) {
          const FirstVal = a.price.raw;
          const SecondVal = b.price.raw;
          return FirstVal - SecondVal;
        }
        dispatch({
          type: FETCH_PRODCS_BY_PRICE,
          payload: mutable.sort(compareNumbersDown),
        });
        return mutable.sort(compareNumbersDown);
      } else if (price == DESCENDING) {
        function compareNumbersUp(a, b) {
          const FirstVal = a.price.raw;
          const SecondVal = b.price.raw;
          return SecondVal - FirstVal;
        }
        dispatch({
          type: FETCH_PRODCS_BY_PRICE,
          payload: mutable.sort(compareNumbersUp),
        });
        return mutable.sort(compareNumbersUp);
      }
    }
  };
