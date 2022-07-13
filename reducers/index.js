import { combineReducers } from "redux";
import SwitchToggle from "./SwitchToggle";
import cartFetch from "./cartFetch";
import cartAdd from "./cartAdd";
import SwitchLan from "./SwitchLan";
import ProductsHandle from "./ProductsHandle";
import Pagination from "./Pagination";
export default combineReducers({
  SwitchToggle,
  cartFetch,
  cartAdd,
  SwitchLan,
  ProductsHandle,
  Pagination,
});
