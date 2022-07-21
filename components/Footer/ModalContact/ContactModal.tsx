import styles from "../../../styles/Footer/ModalContact/ContactModal.module.sass";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
const ContactModal = ({ click, OnClickHandler }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);
  console.log(theme);
  return (
    <div
      className={styles.ContainerForModal}
      onClick={() => OnClickHandler(!click)}
    >
      <div className={styles.ContainerForSenndInfo} data-ison={theme}>
        <h2>Moje informacje Kontaktowe</h2>
      </div>
    </div>
  );
};

export default ContactModal;
