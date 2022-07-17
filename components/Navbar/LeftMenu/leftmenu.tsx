import styles from "../../../styles/navbars/leftMenuNavbar.module.sass";
import { motion, Variants } from "framer-motion";
import { useDimensions } from "./MenuItem/use-dimmensions";
import Navigation from "./MenuItem/NavigationComponent";
import { useRef } from "react";
import { useEffect } from "react";
import { useTheme } from "next-themes";
const sidebar: Variants = {
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

const LeftMenu = ({ IsOpen, opened, data, categories }) => {
  const { theme, setTheme } = useTheme();
  const containerRef = useRef(null);
  const { height }: { height: number } = useDimensions(containerRef);
  let ArrayOfCategories: Array<string> = ["wszystko"];
  categories.map((item) => ArrayOfCategories.push(item.slug));
  useEffect(() => {
    console.log(IsOpen);
  }, [IsOpen]);
  return (
    <motion.nav
      className={opened ? styles.mainCon : styles.mainConClosed}
      initial={false}
      data-ison={theme}
      animate={IsOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <motion.div
        className={styles.background}
        variants={sidebar}
        data-ison={theme}
      />
      <Navigation ArrayOfCategories={ArrayOfCategories} data={data} />
    </motion.nav>
  );
};

export default LeftMenu;
