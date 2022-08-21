//react stuff
import React from "react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { Typography, Grid, Button, CircularProgress } from "@material-ui/core";
import { useTheme } from "next-themes";

//actions and lib
import { commerce } from "../lib/commerce";
import { fetchCart } from "../actions/fetchcommerceCart";

//hooks and iterfaces
import { SetSized } from "../interfaces/interfacesAboutUserDetails";
import useWindowSize from "../hooks/useWindowResize";

//components
import CartItem from "../components/Cart/CartItem";
const DynamicNavbarForComputer = dynamic(
  () => import("../components/Navbar/Navbar")
);
const DynamicNavbarForPhone = dynamic(
  () => import("../components/NavbarForPhone/NavbarPhone")
);
//styles
import useStyles from "../stylesjs/styles";
import styles from "../styles/cart.module.sass";

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
  const size: SetSized = useWindowSize();
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
