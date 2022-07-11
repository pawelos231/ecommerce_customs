import styles from "../styles/notFound.module.sass";
import Navbar from "../components/Navbar/Navbar";
import Link from "next/link";
import { useTheme } from "next-themes";
const NotFound = () => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Navbar />
      <div className={styles.mainContainer} data-ison={theme}>
        <h2>Nic tu nie ma :0</h2>
        <Link href={"/"}>
          <a>
            <button>Powrót do strony głównej</button>
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
