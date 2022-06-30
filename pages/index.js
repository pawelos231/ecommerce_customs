import { CircularProgress } from "@material-ui/core";
import Products from "../components/Products/Products";
import Navbar from "../components/Navbar/Navbar.js";
import { fetchCart } from "../actions/fetchcommerceCart";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/main.module.sass";
import { setCart } from "../actions/setCart";
import { commerce } from "../lib/commerce";
import Header from "../components/Header/Header";
import { FetchAllProducts } from "../actions/ProductsAction";
export async function getStaticProps() {
  const { data } = await commerce.products.list();
  return {
    props: {
      data,
    },
    revalidate: 1, //later add redux to make filtering easier
  };
}

export default function Component({ data }) {
  const dispatch = useDispatch();
  const combined = async () => {
    dispatch(FetchAllProducts(data));
    dispatch(fetchCart());
  };

  const val2 = useSelector((state) => {
    return state.ProductsHandle.prodcs;
  });
  console.log(val2);
  const val = useSelector((state) => {
    return state;
  });
  let isOn = val.SwitchToggle;
  useEffect(() => {
    combined();
  }, [dispatch, val.cartAdd.cart]);
  return (
    <div className={styles.mainContainer} data-ison={isOn}>
      <Navbar
        totaltems={val.cartFetch.total_items}
        data={data}
        mutData={val2}
      />
      <Header />
      <Products setCart={setCart} data={val2}></Products>
    </div>
  );
}

/*onClick={()=> func(session.user.name, session.user.email) */
