import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import styles from "../../../styles/navbar.module.sass";
import { FetchProductsBySearchInput } from "../../../actions/ProductsAction";
import { useState } from "react";
const SearchBar = ({ data }) => {
  const [searchedInput, handleSearchInput] = useState<string>("");
  const dispatch = useDispatch();
  const val2: any = useSelector((state: RootStateOrAny) => {
    return state;
  });
  const mutable: Object = val2.ProductsHandle.prodcs;
  const HandleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dataFromSearchBar: string = e.target.value;
    handleSearchInput(dataFromSearchBar);
    dispatch(FetchProductsBySearchInput(data, mutable, dataFromSearchBar));
  };
  return (
    <div className={styles.serchBar}>
      <input type="text" placeholder="szukaj..." onChange={HandleSearch} />
    </div>
  );
};

export default SearchBar;
