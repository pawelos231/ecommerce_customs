//react and next stuff
import Link from "next/link";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

//interfaces and hooks
import { SetSized } from "../interfaces/interfacesAboutUserDetails";
import useWindowSize from "../hooks/useWindowResize";

//styles
import styles from "../styles/notFound.module.sass";
import { motion } from "framer-motion";

//components
const DynamicNavbarForComputer = dynamic(
  () => import("../components/Navbar/Navbar")
);
const DynamicNavbarForPhone = dynamic(
  () => import("../components/NavbarForPhone/NavbarPhone")
);

const NotFound = () => {
  const { theme, setTheme } = useTheme();
  const size: SetSized = useWindowSize();
  return (
    <>
      {size.width > 720 ? (
        <DynamicNavbarForComputer
          totaltems={null}
          data={null}
          categories={null}
        />
      ) : (
        <DynamicNavbarForPhone />
      )}
      <div className={styles.mainContainer} data-ison={theme}>
        <h1>404 Nie znaleziono strony!</h1>
        <p>Strona nie istnieje :(</p>
        <Link href={"/"}>
          <a>
            <motion.button
              className={styles.BackToHomePageButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              Powrót do sklepu
            </motion.button>
          </a>
        </Link>
      </div>
    </>
  );
};
export const getStaticProps = async () => {
  return {
    props: {},
    revalidate: true,
  };
};

export default NotFound;
