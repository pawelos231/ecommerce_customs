import styles from "../../../styles/UserDetails/userDetails.module.sass";
import { motion } from "framer-motion";
import Link from "next/link";
const NavbarUser = () => {
  return (
    <nav className={styles.navigation}>
      <ul>
        {[
          { text: "zamowienia", link: "/user" },
          { text: "ulubione", link: "/user/Favourite" },
          { text: "cos1", link: "/user/Favourite" },
          { text: "pop3", link: "/user/Favourite" },
          { text: "smtp", link: "/user/Favourite" },
        ].map((item) => (
          <Link href={item.link}>
            <motion.li whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
              {item.text}
            </motion.li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavbarUser;
