import { motion } from "framer-motion";
import styles from "../../../../styles/navbars/leftMenuNavbar.module.sass";
const colors: Array<string> = ["#FF008C", "#D309E1", "#9C1AFF"];
const MenuItem = ({ i, item, variants }) => {
  const style: Object = { border: `2px solid ${colors[i]}`, zIndex: 9999 };
  return (
    <motion.div
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={styles.TextPlaceHolder}
    >
      <div style={style} className={styles.iconPlaceholder}>
        {item}
      </div>
    </motion.div>
  );
};

export default MenuItem;
