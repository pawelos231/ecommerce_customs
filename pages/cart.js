import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchCart } from "../actions/fetchcommerceCart";
import { Typography, Grid, Button, CircularProgress } from "@material-ui/core";
import useStyles from "../stylesjs/styles";
import Navbar from "../components/Navbar/Navbar.js";
import styles from "../styles/cart.module.sass";
import CartItem from "../components/Cart/CartItem";
import { useTheme } from "next-themes";
import React from "react";
const CartPage = ({ data }) => {
  console.log(data);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    dispatch(fetchCart());
  }, []);
  const cartItems = useSelector((state) => {
    return state;
  });

  const language = cartItems.SwitchLan.language;
  console.log(cartItems.cartFetch);
  let isOn = cartItems.SwitchToggle;
  const lineItems = cartItems.cartFetch.line_items;
  if (Object.keys(cartItems.cartFetch).length === 0) {
    return (
      <div className={styles.containerForCircular} data-ison={theme}>
        <CircularProgress size={102} />
      </div>
    );
  }

  const FilledCart = () => (
    <>
      <Grid className={classes.con} container spacing={3}>
        {lineItems.map((lineItem) => (
          <Grid item xs={12} sm={3} key={lineItem.id}>
            <CartItem lineItem={lineItem} />
          </Grid>
        ))}
        <div className={classes.details}>
          <Typography variant="h4">
            Subtotal: {cartItems.cartFetch.subtotal.formatted_with_symbol}
          </Typography>
          <div>
            <Button
              className={classes.emptyButton}
              size="large"
              variant="contained"
              color="secondary"
            >
              Empty Cart
            </Button>
            <Button
              className={classes.checkoutButton}
              size="large"
              variant="contained"
              color="primary"
            >
              Checkout
            </Button>
          </div>
        </div>
      </Grid>
    </>
  );

  return (
    <>
      <Navbar />
      <div className={styles.mainContainer} data-ison={theme}>
        <div>.</div>
        <div className={styles.ContainerForNothing}>
          {cartItems.cartFetch.total_items === 0 ? (
            <div>
              {language == "pl" ? (
                <div>nic tu nie ma :c</div>
              ) : (
                <div>Nothing to see here :c</div>
              )}
            </div>
          ) : (
            <FilledCart />
          )}
        </div>
      </div>
    </>
  );
};
export default CartPage;
