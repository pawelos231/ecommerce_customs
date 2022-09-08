import React from "react";
import { Card, IconButton } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import useStyles from "./style";
import { motion } from "framer-motion";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import styles from "../../../styles/Product.module.sass";
import Link from "next/link";
import { useSelector, RootStateOrAny } from "react-redux";
import { useState } from "react";
import { shimmer, toBase64 } from "../../ShimmerEffect/Shimmer";
import { useSession } from "next-auth/react";
import FavsIcon from "./favouriteIconComponent/favsIcon";
import { useTheme } from "next-themes";

const Product = ({ product, setCart }: { product: any; setCart: any }) => {
  const [click, setOnclick] = useState<boolean>(false);
  const { data: session } = useSession();
  const dispatch: Dispatch<any> = useDispatch();
  const { theme, setTheme } = useTheme();

  const ClickProductHandler = () => {
    setOnclick(true);
    localStorage.setItem("click", "yes");
  };

  const classes = useStyles();
  /*
  useEffect(() => {
    let text = [...document.querySelectorAll(".Product_conForText__nAS4s")];
    if (valueOfLan == "pl") {
      text[index].innerHTML = product.attributes[0].value;
    } else if (valueOfLan == "en") {
      text[index].innerHTML = product.attributes[1].value;
    }
  }, [valueOfLan]);
  */
  return (
    <>
      <motion.div
        className={styles.ContainerForEveruProduct}
        whileHover={{
          scale: 1.017,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.97 }}
      >
        <Card
          className={
            String(theme) === "light" ? classes.root : classes.darkRoot
          }
        >
          <div className={styles.containerForTabs} data-ison={theme}>
            <Link href={`/prodcs/${product.id}`}>
              <a onClick={ClickProductHandler}>
                <div
                  className={styles.ContainerForPhoto}
                  style={{ cursor: "pointer" }}
                >
                  <Image
                    className={classes.media}
                    src={product.image.url}
                    width={100}
                    height={100}
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      shimmer(100, 60)
                    )}`}
                    quality={20}
                    alt={`image of ${product.name}`}
                    placeholder="blur"
                    objectFit="cover"
                    layout="fill"
                    title={product.name}
                  />
                </div>
              </a>
            </Link>
          </div>
        </Card>
      </motion.div>
      <div>
        <div className={styles.ConForBuyAndFav}>
          <IconButton
            className={
              theme === "light" ? classes.buttonShop : classes.buttonShopDark
            }
            aria-label="Add to cart"
            onClick={() => dispatch(setCart(product.id, 1))}
          >
            <AddShoppingCart />
          </IconButton>
          {session ? <FavsIcon session={session} product={product} /> : null}
          <h2>{product.name}</h2>
        </div>
        <p className={styles.PriceOfProduct}>{product.price.raw},00 zł</p>
      </div>
    </>
  );
};
export default Product;
