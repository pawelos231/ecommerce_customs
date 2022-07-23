import styles from "../../../styles/Footer/ModalContact/ContactModal.module.sass";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
const ContactModal = ({ click, OnClickHandler }) => {
  const [mounted, setMounted] = useState(false);
  const Variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);
  console.log(theme);
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.1 }}
        variants={Variants}
        className={styles.ContainerForModal}
        onClick={() => OnClickHandler(!click)}
      >
        <motion.div
          className={styles.ContainerForSenndInfo}
          data-ison={theme}
          initial={{ y: "-170%", opacity: 0 }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
          animate={{ y: "0%", opacity: 1 }}
        >
          <h2>Moje informacje Kontaktowe</h2>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactModal;
