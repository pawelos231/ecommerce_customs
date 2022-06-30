import styles from "../../styles/Footer/FooterStyles.module.sass";
import { motion } from "framer-motion";
import { Facebook, Instagram, MailOutline, Twitter } from "@material-ui/icons";
const Footer = () => {
  return (
    <footer className={styles.MainContainer}>
      <img src="/STORY_buty 1-min.jpg" className={styles.cover} />
      <div className={styles.MainContainerForInformation}>
        <div>
          <ul>
            <li>JACKETS</li>
            <li>SHOES</li>
            <li>HOME</li>
            <li>NEW</li>
            <li>PROMOTIONS</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>My account</li>
            <li>Store Locator</li>
            <li>Legal & Privacy</li>
            <li>Contact</li>
            <li>Cookie Settings</li>
          </ul>
        </div>
        <div className={styles.PutOrder}>
          <p>
            The content of this site is copyright-protected and is the property
            of H&M Hennes & Mauritz <p>READ MORE </p>
          </p>
          <div>
            <p>Looking for custom</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              Put order
            </motion.button>
          </div>
        </div>
      </div>
      <div className={styles.MainContainerForMedia}>
        <div>
          <div className={styles.divider}></div>
          <h2>BB Custom</h2>
          <div className={styles.media}>
            <a href="https://www.instagram.com/_bb_custom/" target={"_blank"}>
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram />
              </motion.div>
            </a>
            <a
              href="https://www.facebook.com/basia.bochenczak"
              target={"_blank"}
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook />
              </motion.div>
            </a>
            <a href="https://www.instagram.com/_bb_custom/" target={"_blank"}>
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <MailOutline />
              </motion.div>
            </a>
            <a href="https://www.instagram.com/_bb_custom/" target={"_blank"}>
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter />
              </motion.div>
            </a>
          </div>
          <p>POLAND PL</p>
          <p>BB CUSTOM</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
