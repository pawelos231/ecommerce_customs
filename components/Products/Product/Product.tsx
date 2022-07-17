import React, { useEffect } from "react";
import { Card, CardContent, CardActions, IconButton } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import useStyles from "./style";
import { motion } from "framer-motion";
import Image from "next/image";
import { useDispatch } from "react-redux";
import styles from "../../../styles/Product.module.sass";
import Link from "next/link";
import { useSelector, RootStateOrAny } from "react-redux";
import { useState } from "react";
import { shimmer, toBase64 } from "../../ShimmerEffect/Shimmer";
import { useSession } from "next-auth/react";
import FavsIcon from "./favouriteIconComponent/favsIcon";
import { useTheme } from "next-themes";

const Product = ({ product, setCart, index }) => {
  const [click, setOnclick] = useState(false);
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();
  const value = useSelector((state: RootStateOrAny) => {
    return state.SwitchToggle;
  });
  const valueOfLan = useSelector((state: RootStateOrAny) => {
    return String(state.SwitchLan.language);
  });

  const ClickProductHandler = () => {
    setOnclick(true);
    localStorage.setItem("click", "yes");
  };

  let isOn = value;
  const classes = useStyles(isOn);
  useEffect(() => {
    let text = [...document.querySelectorAll(".Product_conForText__nAS4s")];
    if (valueOfLan == "pl") {
      text[index].innerHTML = product.attributes[0].value;
    } else if (valueOfLan == "en") {
      text[index].innerHTML = product.attributes[1].value;
    }
  }, [valueOfLan]);
  return (
    <motion.div
      whileHover={{
        scale: 1.017,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.97 }}
    >
      <Card
        className={String(theme) === "light" ? classes.root : classes.darkRoot}
      >
        <div className={styles.containerForTabs} data-ison={theme}>
          <Link href={`/prodcs/${product.id}`}>
            <a onClick={ClickProductHandler}>
              <div style={{ cursor: "pointer" }}>
                <Image
                  className={classes.media}
                  src={product.image.url}
                  width={100}
                  height={60}
                  blurDataURL={`data:image/svg+xml;base64,${toBase64(
                    shimmer(100, 60)
                  )}`}
                  quality={20}
                  alt={`image of ${product.name}`}
                  placeholder="blur"
                  objectFit="cover"
                  layout="responsive"
                  title={product.name}
                />
                <CardContent>
                  <div className={styles.CardContent} data-ison={theme}>
                    <h2>{product.name}</h2>
                    <h3>{product.price.formatted_with_symbol}</h3>
                  </div>
                  <p data-ison={theme} className={styles.conForText}>
                    siema
                  </p>
                </CardContent>
              </div>
            </a>
          </Link>

          <CardActions>
            <IconButton
              className={
                String(isOn) === "true"
                  ? classes.buttonShop
                  : classes.buttonShopDark
              }
              aria-label="Add to cart"
              onClick={() => dispatch(setCart(product.id, 1))}
            >
              <AddShoppingCart />
            </IconButton>
          </CardActions>
          {session ? <FavsIcon session={session} product={product} /> : null}
        </div>
      </Card>
    </motion.div>
  );
};
export default Product;
