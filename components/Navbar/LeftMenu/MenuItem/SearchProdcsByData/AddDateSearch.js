import { motion } from "framer-motion";
import styles from "../../../../../styles/navbars/leftMenuNavbar.module.sass";
const DateSearch = ({ variants }) => {
  const color = "#FF008C";
  const style = { border: `2px solid ${color}`, zIndex: 9999 };
  return (
    <motion.div
      variants={variants}
      whileHover={{ scale: 1.05 }}
      whileFocus={{ scale: 1.05 }}
      className={styles.TextPlaceHolder}
    >
      <select style={style} className={styles.iconPlaceholder}>
        <option value="natywnie">natywnie</option>
        <option value="rosnąco">najwcześniej</option>
        <option value="malejąco">najpóźniej</option>
      </select>
    </motion.div>
  );
};

export default DateSearch;
