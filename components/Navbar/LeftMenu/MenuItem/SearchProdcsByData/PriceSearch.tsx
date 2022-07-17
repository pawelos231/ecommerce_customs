import { motion } from "framer-motion";
import styles from "../../../../../styles/navbars/leftMenuNavbar.module.sass";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { FetchProductByPriceSearch } from "../../../../../actions/ProductsAction";
const PriceSearch = ({ variants, data }) => {
  const dispatch = useDispatch();
  const color: string = "#FF008C";
  const style: Object = { border: `2px solid ${color}`, zIndex: 9999 };
  const val2 = useSelector((state: RootStateOrAny) => {
    return state;
  });
  const mutable: Object = val2.ProductsHandle.prodcs;
  const OnChangeSelectHandler = (e: any) => {
    dispatch(FetchProductByPriceSearch(data, mutable, e.target.value));
  };

  return (
    <motion.div
      variants={variants}
      whileHover={{ scale: 1.05 }}
      whileFocus={{ scale: 1.05 }}
      className={styles.TextPlaceHolder}
    >
      <select
        onChange={OnChangeSelectHandler}
        style={style}
        className={styles.iconPlaceholder}
      >
        <option value="natywnie">natywnie</option>
        <option value="rosnąco">rosnąco</option>
        <option value="malejąco">malejąco</option>
      </select>
    </motion.div>
  );
};

export default PriceSearch;
