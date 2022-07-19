import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch, RootStateOrAny } from "react-redux";
import { fetchCart } from "../actions/fetchcommerceCart";
import { Typography, Grid, Button, CircularProgress } from "@material-ui/core";
import useStyles from "../stylesjs/styles";
import Navbar from "../components/Navbar/Navbar";
import styles from "../styles/cart.module.sass";
import CartItem from "../components/Cart/CartItem";
import { useTheme } from "next-themes";
import React from "react";
import { commerce } from "../lib/commerce";
const CartPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [CartItems, setCart] = useState<any>({});
  const handleUpdateCartQty = async (productId: string, quantity: number) => {
    const { cart }: { cart: any } = await commerce.cart.update(productId, {
      quantity,
    });
    setCart(cart);
  };

  const { theme, setTheme } = useTheme();

  const cartItems: any = useSelector((state: RootStateOrAny) => {
    return state;
  });
  useEffect(() => {
    dispatch(fetchCart());
    setCart(cartItems.cartFetch);
  }, [CartItems]);
  console.log(CartItems);
  const language: string = cartItems.SwitchLan.language;
  const lineItems: any = cartItems.cartFetch.line_items;
  if (Object.keys(cartItems.cartFetch).length === 0) {
    return (
      <div className={styles.containerForCircular} data-ison={theme}>
        <CircularProgress size={102} />
      </div>
    );
  }

  const FilledCart = ({ handleUpdateCartQty }) => (
    <>
      <Grid className={classes.con} container spacing={3}>
        <div className={classes.containerForCards}>
          {lineItems.map((lineItem: any) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={5}
              key={lineItem.id}
              className={classes.conForCards}
            >
              <CartItem
                lineItem={lineItem}
                handleUpdateCartQty={handleUpdateCartQty}
              />
            </Grid>
          ))}
        </div>
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
      <Navbar totaltems={null} data={null} categories={null} />
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
            <FilledCart handleUpdateCartQty={handleUpdateCartQty} />
          )}
        </div>
      </div>
    </>
  );
};
export default CartPage;
