import { useDispatch, useSelector } from "react-redux";
import styles from "../../../styles/navbar.module.sass";
import { SwitchMode } from "../../../actions/switchAction";
import { motion } from "framer-motion";
const Switch = () => {
  const dispatch = useDispatch();
  const value = useSelector((state) => {
    return state.SwitchToggle;
  });
  let isOn = value;
  console.log(String(isOn));
  const setToLocal = () => {
    dispatch(SwitchMode());
    localStorage.setItem("background", String(!isOn));
  };
  if (typeof window !== "undefined") {
    console.log(localStorage.getItem("background"));
    console.log(String(isOn));
  }
  return (
    <div
      data-ison={isOn}
      className={styles.switch}
      onClick={() => setToLocal()}
    >
      <motion.div
        data-ison={isOn}
        className={styles.handle}
        layout
        transition={spring}
      />
    </div>
  );
};
const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};
export default Switch;
