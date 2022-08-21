//react stuff
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { CircularProgress } from "@material-ui/core";

//auth
import { useSession } from "next-auth/react";

//actions
import { fetchCart } from "../../actions/fetchcommerceCart";
import { useDispatch } from "react-redux";

//hooks and interfaces
import FavsInfo from "../../interfaces/interfaces";
import { RecommandedProducts } from "../../interfaces/interfacesAboutUserDetails";

//styles
import styles from "../../styles/UserDetails/userDetails.module.sass";
import { motion } from "framer-motion";

//components
import NestedLayout from "../../components/Layouts/layouUserInterface";
import FavProd from "../../components/Products/ProductFav/Prodfav";
import { shimmer, toBase64 } from "../../components/ShimmerEffect/Shimmer";

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
    const fetchAllProdcs: () => Promise<void> = async () => {
      await fetch(`/api/favourite/userDataFetch/${session?.user?.id}`)
        .then((response) => response.json())
        .then((data) => {
          SetFetchedProductsHandler(data);
        });
    };
    fetchAllProdcs();
    dispatch(fetchCart());
  }, [session]);
  const tabOfRecommendedProdcuts: RecommandedProducts[] = [
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
  if (!fetchedProdcs.prodcs) {
    return <CircularProgress />;
  }
  return (
    <div className={styles.ContainerForEverithingFavsSection} data-ison={theme}>
      <h1>Moje ulubione Produkty</h1>
      <div className={styles.ContainerForEverything}>
        {fetchedProdcs.prodcs.length !== 0 ? (
          <div className={styles.ContainerForDescription}>
            <p>
              Doskonale wiemy, że zakupy wymagają cierpliwości i zastanowienia.
              Daj sobie czas do namysłu. Dodaj swoje typy do ulubionych, a
              później zdecyduj które po prostu musisz mieć. Zakupy z CCC to
              zawsze dobry wybór więc pozwól sobie na zakup większej ilości
              produktów? Butów i torebek przecież nigdy za wiele.
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
                <div>Brak Ulubionych :(</div>
                <p>zobacz polecane produkty</p>
                <div className={styles.ContainerForImages}>
                  {tabOfRecommendedProdcuts.map((item: any) => (
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
      </div>
    </div>
  );
};
Favourite.getLayout = (page: any) => {
  return <NestedLayout>{page}</NestedLayout>;
};

export default Favourite;
