import { fetchCart } from "../../actions/fetchcommerceCart";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import styles from "../../styles/UserDetails/userDetails.module.sass";
import NestedLayout from "../../components/Layouts/layouUserInterface";
import { useSession } from "next-auth/react";
import { useState } from "react";
import FavProd from "../../components/Products/ProductFav/Prodfav";
import Link from "next/link";
import { motion } from "framer-motion";
import { CircularProgress } from "@material-ui/core";
import Image from "next/image";
import { shimmer, toBase64 } from "../../components/ShimmerEffect/Shimmer";
import { useTheme } from "next-themes";
import { RecommandedProducts } from "../../interfaces/interfacesAboutUserDetails";
import FavsInfo from "../../interfaces/interfaces";
import Head from "next/head";
type StateOfFavsProduts = {
  prodcs: FavsInfo[];
};
const Favourite = () => {
  const [fetchedProdcs, SetFetchedProductsHandler] = useState<
    StateOfFavsProduts | any
  >([]);
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllProdcs = async () => {
      await fetch(`/api/favourite/userDataFetch/${session?.user?.id}`)
        .then((response) => response.json())
        .then((data) => {
          SetFetchedProductsHandler(data);
        });
    };
    fetchAllProdcs();
    dispatch(fetchCart());
  }, [session]);
  const tabOfPol: RecommandedProducts[] = [
    {
      link: "prod_nPEVlNaMZL5a7d",
      image:
        "https://cdn.chec.io/merchants/41171/assets/EkEdVbXExVdvgFx7|chuj.jpg",
    },
    {
      link: "prod_zkK6oLAZ1V5Xn0",
      image:
        "https://cdn.chec.io/merchants/41171/assets/DLsyGeUJKt54HbAT|1000+ 4-min.jpg",
    },
    {
      link: "prod_VPvL5zWEg9lAQk",
      image:
        "https://cdn.chec.io/merchants/41171/assets/Xcc3OwQ4xmMRDkGU|xdd.jpg",
    },
  ];
  console.log(fetchedProdcs.prodcs);
  if (!fetchedProdcs.prodcs) {
    return <CircularProgress />;
  }
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
        <title>BB Customs Eccomerce Shop</title>

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
      {fetchedProdcs.prodcs.length !== 0 ? (
        <div className={styles.ContainerForDescription}>
          <h1>Moje ulubione Produkty</h1>
          <p>
            Doskonale wiemy, że zakupy wymagają cierpliwości i zastanowienia.
            Daj sobie czas do namysłu. Dodaj swoje typy do ulubionych, a później
            zdecyduj które po prostu musisz mieć. Zakupy z CCC to zawsze dobry
            wybór więc pozwól sobie na zakup większej ilości produktów? Butów i
            torebek przecież nigdy za wiele.
          </p>
        </div>
      ) : null}

      <div className={styles.container} data-ison={theme}>
        <section className={styles.mainContainerForFavs}>
          {fetchedProdcs.prodcs.length !== 0 ? (
            <div className={styles.contained}>
              {fetchedProdcs.prodcs.map((item: any) => (
                <Link href={`/prodcs/${item.ProductIdentity}`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <FavProd prod={item} />
                  </motion.div>
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.NoFavs}>
              <div>Brak Ulubionych :c</div>
              <p>zobacz polecane produkty</p>
              <div className={styles.ContainerForImages}>
                {tabOfPol.map((item: any) => (
                  <Link href={`../prodcs/${item.link}`}>
                    <div className={styles.ConForImage}>
                      <Image
                        src={item.image}
                        width={20}
                        height={20}
                        layout="responsive"
                        objectFit="cover"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(
                          shimmer(100, 60)
                        )}`}
                        placeholder="blur"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
};
Favourite.getLayout = (page) => {
  return <NestedLayout>{page}</NestedLayout>;
};

export default Favourite;
