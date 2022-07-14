import React from "react";
import { CircularProgress, Grid } from "@material-ui/core";
import Product from "./Product/Product";
import { motion } from "framer-motion";
import styles from "../../styles/Product.module.sass";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Products = ({ setCart, data}) => {
  console.log(data);
  const [switcher, swtchervalue] = useState("");
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };
  const container2 = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
    },
  };
  const Language = useSelector((state) => {
    return state.SwitchLan.language;
  });
  console.log(Language);

  const itemos = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };
  const swtchervalueHandler = () => {
    let load = localStorage.getItem("click");
    swtchervalue(load);
  };

  useEffect(() => {
    swtchervalueHandler();
  }, []);
  if (data.length === 0) {
    return (
      <div className={styles.CircContainer}>
        <CircularProgress color="black" size={102} />
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
          spacing={4}
          component={motion.div}
          variants={switcher != "yes" ? container : container2}
          initial="hidden"
          animate="show"
        >
          {
            // Animation to fix
            data.length !== 0 ? (
              switcher != "yes" ? (
                data.map((item, i) => (
                  <Grid
                    item
                    key={item.id}
                    xs={12}
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
                data.map((item, i) => (
                  <Grid
                    item
                    key={item.id}
                    xs={12}
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
              )
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
