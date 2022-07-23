import styles from "../../styles/Footer/FooterStyles.module.sass";
import { Facebook, Instagram, MailOutline, Twitter } from "@material-ui/icons";
import dynamic from "next/dynamic";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
const DynamicContactModal = dynamic(() =>
  import("./ModalContact/ContactModal")
);
const Footer = () => {
  const [click, OnClickHandler] = useState(false);
  const Variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  console.log(click);
  return (
    <>
      <footer className={styles.MainContainer}>
        <img
          src="/STORY_buty 1-min.jpg"
          className={styles.cover}
          alt="cover for footer"
        />
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
              <Link href="/">
                <a>
                  <li>Legal & Privacy</li>
                </a>
              </Link>

              <motion.a onClick={() => OnClickHandler(!click)}>
                <li>Contact</li>
              </motion.a>

              <Link href="/">
                <a>
                  <li>Cookie Settings</li>
                </a>
              </Link>
            </ul>
          </div>
          <div className={styles.PutOrder}>
            <p>
              The content of this site is copyright-protected and is the
              property of H&M Hennes & Mauritz <p>READ MORE </p>
            </p>
            <div>
              <p>Looking for custom</p>
              <Link href={`/cart`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Put order
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.MainContainerForMedia}>
          <div>
            <div className={styles.divider}></div>
            <h2>BB Custom</h2>
            <div className={styles.media}>
              <a
                title="Instagram"
                href="https://www.instagram.com/_bb_custom/"
                target={"_blank"}
              >
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Instagram />
                </motion.div>
              </a>
              <a
                title="Facebook"
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
              <a
                title="Mail"
                href="https://www.youtube.com/channel/UCNFbvMD45Kn_kccYyisc-WA"
                target={"_blank"}
              >
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <MailOutline />
                </motion.div>
              </a>
              <a
                title="Twitter"
                href="https://twitter.com/LinekPawe"
                target={"_blank"}
              >
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Twitter />
                </motion.div>
              </a>
              <a
                title="linkedin"
                href="https://www.linkedin.com/in/basia-bochenczak-7b8514238/"
                target={"_blank"}
              >
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Linkedin
                </motion.div>
              </a>
            </div>
            <p>POLAND PL</p>
            <p>BB CUSTOM</p>
          </div>
        </div>
      </footer>
      <AnimatePresence>
        <motion.div initial="hidden" animate="visible" variants={Variants}>
          {click ? (
            <DynamicContactModal
              OnClickHandler={OnClickHandler}
              click={click}
            />
          ) : null}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Footer;
