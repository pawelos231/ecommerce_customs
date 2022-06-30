import styles from "../../../styles/navbars/leftMenuNavbar.module.sass";
import { motion, useCycle } from "framer-motion";
import MenuToggle from "./MenuItem/MenuToggle";
import { useDimensions } from "./MenuItem/use-dimmensions";
import Navigation from "./MenuItem/NavigationComponent";
import { useRef } from "react";
import { useEffect } from "react";
const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const LeftMenu = ({ IsOpen, opened, ArrayOfCategories, data }) => {
  const containerRef = useRef(null);
  console.log(ArrayOfCategories);
  const { height } = useDimensions(containerRef);
  useEffect(() => {
    console.log(IsOpen);
  }, [IsOpen]);
  return (
    <motion.nav
      className={opened ? styles.mainCon : styles.mainConClosed}
      initial={false}
      animate={IsOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <motion.div className={styles.background} variants={sidebar} />
      <Navigation
        ArrayOfCategories={ArrayOfCategories}
        data={data}
        
      />
    </motion.nav>
  );
};

export default LeftMenu;
