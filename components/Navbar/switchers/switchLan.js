import styles from "../../../styles/navbar.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { SwitchLanguage } from "../../../actions/LanguageSwitch";
const SwitchLan = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.containerforLan}>
      <p onClick={() => dispatch(SwitchLanguage("en"))}>en</p>
      <p onClick={() => dispatch(SwitchLanguage("pl"))}>pl</p>
    </div>
  );
};

export default SwitchLan;
