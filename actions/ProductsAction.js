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
import { LIMIT } from "../constants/Limit";
import { commerce } from "../lib/commerce";
let dataProdcs;
const init = async () => {
  dataProdcs = await commerce.products.list();
};
init();
export const FetchAllProducts = (page) => async (dispatch) => {
  const { data } = await commerce.products.list({
    limit: LIMIT,
    page: page,
  });
  dispatch({ type: FETCH_ALL_PRODUCTS, payload: data });
};
export const FetchProductsBySearchInput =
  (prodcs, mutable, search) => async (dispatch) => {
    if (search == "") {
      dispatch({
        type: FETCH_PRODCS_BY_SEARCH_INPUT,
        payload: dataProdcs.data,
      });
      return dataProdcs.data;
    } else {
      let newAray = [];
      const fuse = new Fuse(dataProdcs.data, {
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
/*
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
        payload: dataProdcs.data.filter((item) => {
          if (item?.categories[0]?.slug == category) {
            return item;
          }
        }),
      });
      return dataProdcs.data.filter((item) => {
        if (item?.categories[0]?.slug == category) {
          return item;
        }
      });
    }
  };*/

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
      const {
        meta: { pagination },
      } = await commerce.products.list({
        category_slug: [category],
      });
      const PagesCount = Math.ceil(pagination.count / LIMIT);
      const { data } = await commerce.products.list({
        category_slug: [category],
        limit: LIMIT,
      });
      dataProdcs.data = data;
      dispatch({
        type: FETCH_PRODCS_BY_CATEGORY,
        payload: { data, PagesCount },
      });
      return data;
    }
  };

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
          payload: dataProdcs.data.sort(compareNumbersDown),
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
          payload: dataProdcs.data.sort(compareNumbersUp),
        });
        return dataProdcs.data.sort(compareNumbersUp);
      }
    }
  };
