import { fetchCart } from "../../actions/fetchcommerceCart";
import { useSelector, useDispatch } from "react-redux";
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
const Favourite = () => {
  const valueOfColor = useSelector((state) => {
    return state.SwitchToggle;
  });
  const [fetchedProdcs, fetchHandle] = useState([]);
  const { data: session } = useSession();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllProdcs = async () => {
      await fetch(`/api/favourite/userDataFetch/${session?.user?.id}`)
        .then((response) => response.json())
        .then((data) => {
          fetchHandle(data);
        });
    };
    fetchAllProdcs();
    dispatch(fetchCart());
  }, [session]);
  const tabOfPol = [
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
    <>
      <div className={styles.container} data-ison={valueOfColor}>
        <section className={styles.mainContainerForFavs}>
          {fetchedProdcs.prodcs.length !== 0 ? (
            <div>
              {fetchedProdcs.prodcs.map((item) => (
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
                {tabOfPol.map((item) => (
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
