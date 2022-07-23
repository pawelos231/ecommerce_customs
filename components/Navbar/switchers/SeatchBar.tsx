import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import styles from "../../../styles/navbar.module.sass";
import { FetchProductsBySearchInput } from "../../../actions/ProductsAction";
import { useState } from "react";
import { Search } from "@material-ui/icons";
import { useSession } from "next-auth/react";
import Router from "next/router";
const SearchBar = ({ data }) => {
  const { pathname }: any = Router;
  const [searchedInput, handleSearchInput] = useState<string>("");
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const val2: any = useSelector((state: RootStateOrAny) => {
    return state;
  });
  const mutable: Object = val2.ProductsHandle.prodcs;
  const HandleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dataFromSearchBar: string = e.target.value;
    if (pathname !== "/") {
      Router.push("/");
    }
    handleSearchInput(dataFromSearchBar);
    dispatch(FetchProductsBySearchInput(data, mutable, dataFromSearchBar));
  };
  if (!session) {
    return (
      <div className={styles.serchBar}>
        <div className={styles.ContainerForSearchIcon}>
          <Search />
        </div>
        <input type="text" placeholder="szukaj..." onChange={HandleSearch} />
      </div>
    );
  } else {
    return (
      <div className={styles.serchBarForLogedUsers}>
        <div className={styles.ContainerForSearchIcon}>
          <Search />
        </div>
        <input type="text" placeholder="szukaj..." onChange={HandleSearch} />
      </div>
    );
  }
};

export default SearchBar;
