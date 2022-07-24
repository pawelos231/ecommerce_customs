import styles from "../../../styles/UserDetails/userDetails.module.sass";
import { motion } from "framer-motion";
import Link from "next/link";
import { Links } from "../../../interfaces/interfacesAboutUserDetails";
import { ArrowRight, ArrowLeft } from "@material-ui/icons";
import { useState } from "react";
const NavbarUser = () => {
  const TabOfLinksToUserDetailedPages: Links[] = [
    { text: "zamowienia", link: "/user" },
    { text: "ulubione", link: "/user/Favourite" },
    { text: "cos1", link: "/user/Favourite" },
    { text: "pop3", link: "/user/Favourite" },
    { text: "smtp", link: "/user/Favourite" },
  ];
  const [click, clickHandle] = useState<boolean>(false);
  return (
    <>
      <motion.div
        className={
          !click
            ? styles.ContainerForArrrowRight
            : styles.ContainerForArrrowLeft
        }
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => clickHandle(!click)}
      >
        {!click ? (
          <ArrowRight fontSize="inherit" />
        ) : (
          <ArrowLeft fontSize="inherit" />
        )}
      </motion.div>

      <nav className={click ? styles.navigationOpen : styles.navigation}>
        <ul>
          {TabOfLinksToUserDetailedPages.map((item) => (
            <Link href={item.link}>
              <motion.li whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
                {item.text}
              </motion.li>
            </Link>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default NavbarUser;
