import styles from "../../../styles/UserDetails/userDetails.module.sass";
import { motion } from "framer-motion";
import Link from "next/link";
import { Links } from "../../../interfaces/interfacesAboutUserDetails";
import { ArrowRight, ArrowLeft } from "@material-ui/icons";
import { useState } from "react";
import { Person, Home, ShoppingCart, Favorite } from "@material-ui/icons";
import { useTheme } from "next-themes";
const NavbarUser = () => {
  const TabOfLinksToUserDetailedPages: Links[] = [
    { text: "Strona główna", link: "/user", icon: <Home /> },
    { text: "ulubione", link: "/user/Favourite", icon: <Favorite /> },
    { text: "Zamówienia", link: "/user/Favourite", icon: <ShoppingCart /> },
    { text: "Informacje", link: "/user/Favourite", icon: <Person /> },
  ];
  const { theme, setTheme } = useTheme();
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

      <nav
        className={click ? styles.navigationOpen : styles.navigation}
        data-ison={theme}
      >
        <ul>
          {TabOfLinksToUserDetailedPages.map((item: Links) => (
            <Link href={item.link}>
              <motion.li whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
                <div className={styles.IconContainer}>{item.icon}</div>

                <div className={styles.TextContainer}>{item.text}</div>
              </motion.li>
            </Link>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default NavbarUser;
