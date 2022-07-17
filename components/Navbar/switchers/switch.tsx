import { useSelector, RootStateOrAny } from "react-redux";
import styles from "../../../styles/navbar.module.sass";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useState } from "react";
const Switch = () => {
  const value: boolean = useSelector((state: RootStateOrAny) => {
    return state.SwitchToggle;
  });
  const [switcher, switchHandle] = useState(false);
  const { theme, setTheme } = useTheme();
  let isOn = value;
  console.log(String(isOn));
  const setToLocal = () => {
    switchHandle(!switcher);
    if (switcher == true) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  return (
    <div
      data-ison={theme}
      className={styles.switch}
      onClick={() => setToLocal()}
    >
      <motion.div
        data-ison={theme}
        className={styles.handle}
        layout
        transition={spring}
      />
    </div>
  );
};
const spring: Object = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};
export default Switch;
