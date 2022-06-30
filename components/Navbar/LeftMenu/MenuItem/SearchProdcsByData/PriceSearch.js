import { motion } from "framer-motion";
import styles from "../../../../../styles/navbars/leftMenuNavbar.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { FetchProductByPriceSearch } from "../../../../../actions/ProductsAction";
const PriceSearch = ({ variants, data }) => {
  const dispatch = useDispatch();
  const color = "#FF008C";
  const style = { border: `2px solid ${color}`, zIndex: 9999 };
  const val2 = useSelector((state) => {
    return state;
  });
  const mutable = val2.ProductsHandle.prodcs;
  const OnChangeSelectHandler = (e) => {
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
