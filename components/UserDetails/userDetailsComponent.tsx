import styles from "../../styles/UserDetails/userDetails.module.sass";
import { motion } from "framer-motion";
import Link from "next/link";
import { Links } from "../../interfaces/interfacesAboutUserDetails";
import { Person, Home, ShoppingCart, Favorite } from "@material-ui/icons";
const UserDetailsComponent = () => {
  const TabOfLinksToUserDetailedPages: Links[] = [
    {
      text: "Strona główna",
      link: "/user",
      icon: <Home />,
    },
    { text: "ulubione", link: "/user/Favourite", icon: <Favorite /> },
    { text: "Zamówienia", link: "/user/Favourite", icon: <ShoppingCart /> },
    { text: "pop3", link: "/user/Favourite", icon: <Person /> },
  ];
  return (
    <>
      <nav className={styles.navigation}>
        <ul>
          {TabOfLinksToUserDetailedPages.map((item: Links) => (
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

export default UserDetailsComponent;
