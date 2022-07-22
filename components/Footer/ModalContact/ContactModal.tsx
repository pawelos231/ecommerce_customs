import styles from "../../../styles/Footer/ModalContact/ContactModal.module.sass";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
const ContactModal = ({ click, OnClickHandler }) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const Variants: any = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);
  console.log(theme);
  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={Variants}
        className={styles.ContainerForModal}
        onClick={() => OnClickHandler(!click)}
      >
        <div className={styles.ContainerForSenndInfo} data-ison={theme}>
          <h2>Moje informacje Kontaktowe</h2>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactModal;
