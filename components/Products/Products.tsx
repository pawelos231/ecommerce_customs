import React from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import Product from "./Product/Product";
import { motion, Variant } from "framer-motion";
import styles from "../../styles/Product.module.sass";
import { useEffect, useState } from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import useWindowSize from "../../hooks/useWindowResize";
import { SetSized } from "../../interfaces/interfacesAboutUserDetails";
const Products = ({ setCart, data }) => {
  const [switcher, swtchervalue] = useState<string>("");

  const container: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const container2: any = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
    },
  };

  const Language: string = useSelector((state: RootStateOrAny) => {
    return state.SwitchLan.language;
  });

  const itemos: any = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  const swtchervalueHandler = () => {
    let load: string = localStorage.getItem("click");
    swtchervalue(load);
  };

  const size: SetSized = useWindowSize();

  useEffect(() => {
    swtchervalueHandler();
  }, []);
  if (!data) {
    return (
      <div className={styles.CircContainer}>
        <CircularProgress color="secondary" size={102} />
      </div>
    );
  }
  return (
    <main className={styles.content} style={{ marginTop: "20px" }}>
      <div>
        <div />
        <Grid
          container
          justify="center"
          className={styles.ContainerForProducts}
          spacing={size.width < 720 ? 2 : 4}
          component={motion.div}
          variants={switcher != "yes" ? container : container2}
          initial="hidden"
          animate="show"
        >
          {
            // Animation to fix
            data.length !== 0 ? (
              data.map((item: any, i: number) => (
                <Grid
                  item
                  key={item.id}
                  xs={6}
                  sm={6}
                  md={4}
                  lg={3}
                  component={motion.div}
                  variants={itemos}
                  initial="hidden"
                  animate="show"
                >
                  <Product product={item} setCart={setCart} index={i} />
                </Grid>
              ))
            ) : (
              <h2 className={styles.emptyProdcs}>
                {Language == "pl" ? (
                  <p>nie ma produktu którego próbujesz wyszukać :(</p>
                ) : (
                  <p>the product you are looking for does not exist :(</p>
                )}
              </h2>
            )
          }
        </Grid>
      </div>
    </main>
  );
};

export default Products;
