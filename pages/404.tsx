import styles from "../styles/notFound.module.sass";
import Link from "next/link";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { SetSized } from "../interfaces/interfacesAboutUserDetails";
import useWindowSize from "../hooks/useWindowResize";
import Head from "next/head";
import { motion } from "framer-motion";
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
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;1,400;1,500&family=Hahmlet:wght@100;200;300;500;600&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="canonical" href="https://ecommerce-basia.vercel.app" />
        <link
          rel="alternate"
          href="https://ecommerce-basia.vercel.app"
          hrefLang="en-us"
        />
        <link rel="icon" type="image/x-icon" href="/logo.png" />
        <title>BB Customs 404 Page</title>

        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <meta
          name="keywords"
          content="Custom, design, customowe kurtki, customowe buty, customowe bluzki, malowane, ręcznie, style"
        />
        <meta
          name="description"
          content="Sklep ecommerce sprzedający wysokiej jakości kurtki oraz buty, szeroki wybór w customach oraz możliwość dodania własnych możliwości"
        />
        <meta name="author" content="Pawelos" />
        <meta property="og:title" content="BB customs shop" />
        <meta property="og:url" content="https://ecommerce-basia.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://ecommerce-basia.vercel.app/STORY_buty%201-min.jpg"
        />
        <meta
          property="og:description"
          content="Sklep ecommerce sprzedający wysokiej jakości kurtki oraz buty, szeroki wybór w customach oraz możliwość dodania własnych możliwości, pozwala to na gustowne stworzenie swojego własnego stylu!"
        />
        <meta property="og:locale" content="pl_PL" />
        <meta property="og:site_name" content="BB customs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@LinekPawe" />
        <meta name="twitter:title" content="BB Customs Eccomerce Shop" />
        <meta
          name="twitter:description"
          content="Sklep ecommerce sprzedający wysokiej jakości kurtki oraz buty, szeroki wybór w customach oraz możliwość dodania własnych możliwości, pozwala to na gustowne stworzenie swojego własnego stylu!"
        />
        <meta
          name="twitter:image"
          content="https://ecommerce-basia.vercel.app/STORY_buty%201-min.jpg"
        />
      </Head>
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
