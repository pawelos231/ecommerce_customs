import { useDispatch, useSelector } from "react-redux";
import styles from "../../../styles/navbar.module.sass";
import { FetchProductsBySearchInput } from "../../../actions/ProductsAction";
import { useState } from "react";
const SearchBar = ({ data }) => {
  const [searchedInput, handleSearchInput] = useState("");
  const dispatch = useDispatch();
  const val2 = useSelector((state) => {
    return state;
  });
  const mutable = val2.ProductsHandle.prodcs;
  const HandleSearch = (e) => {
    const dataFromSearchBar = e.target.value;
    handleSearchInput(dataFromSearchBar);
    console.log(data); //name, category, price
    //categories[0].name, .name, .price.raw
    dispatch(FetchProductsBySearchInput(data, mutable, dataFromSearchBar));
  };
  return (
    <div className={styles.serchBar}>
      <input type="text" placeholder="szukaj..." onChange={HandleSearch} />
    </div>
  );
};

export default SearchBar;
