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
import { useTheme } from "next-themes";
export async function getStaticProps() {
  const { data } = await commerce.products.list({
    limit: 20,
    page: 1,
  });
  const { data: categories } = await commerce.categories.list();

  return {
    props: {
      data,
      categories,
    },
    revalidate: 1, //later add redux to make filtering easier
  };
}

export default function Component({ data, categories }) {
  const dispatch = useDispatch();
  const combined = async () => {
    dispatch(FetchAllProducts(data));
    dispatch(fetchCart());
  };
  const { theme, setTheme } = useTheme();

  const val2 = useSelector((state) => {
    return state.ProductsHandle.prodcs;
  });
  console.log(val2);
  const val = useSelector((state) => {
    return state;
  });
  let isOn = val.SwitchToggle;
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    combined();
    setMounted(true);
  }, [dispatch, val.cartAdd.cart]);
  if (!mounted) {
    return null;
  }
  return (
    <div className={styles.mainContainer} data-ison={theme}>
      <Navbar
        totaltems={val.cartFetch.total_items}
        data={data}
        mutData={val2}
        categories={categories}
      />
      <Header />
      <Products setCart={setCart} data={val2}></Products>
    </div>
  );
}

/*onClick={()=> func(session.user.name, session.user.email) */
