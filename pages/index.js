import Products from "../components/Products/Products.tsx";
import Navbar from "../components/Navbar/Navbar";
import { fetchCart } from "../actions/fetchcommerceCart";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/main.module.sass";
import { setCart } from "../actions/setCart";
import { commerce } from "../lib/commerce";
import Header from "../components/Header/Header";
import { FetchAllProducts } from "../actions/ProductsAction";
import { useTheme } from "next-themes";
import { Pagination } from "@mui/material";
import { SetPaginatedSite } from "../actions/Pagination";
export async function getStaticProps() {
  const LIMIT = 24;
  const { data } = await commerce.products.list({
    limit: LIMIT,
    page: 1,
  });
  const { data: categories } = await commerce.categories.list();
  const {
    meta: { pagination },
  } = await commerce.products.list();
  return {
    props: {
      data,
      categories,
      pagination,
      LIMIT,
    },
    revalidate: 1, //later add redux to make filtering easier
  };
}

export default function Component({ data, categories, pagination, LIMIT }) {
  const dispatch = useDispatch();
  const PagesCount = Math.ceil(pagination.count / LIMIT);
  const combined = async () => {
    //dispatch(FetchAllProducts());
    dispatch(fetchCart());
  };
  const { theme, setTheme } = useTheme();

  const val2 = useSelector((state) => {
    return state.ProductsHandle.prodcs;
  });
  const val3 = useSelector((state) => {
    return state.Pagination;
  });
  console.log(val3);
  console.log(val2);
  const val = useSelector((state) => {
    return state;
  });
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    combined();
    setMounted(true);
  }, [dispatch, val.cartAdd.cart]);
  if (!mounted) {
    return (
      <div className={styles.mainContainer}>
        <Navbar
          totaltems={val.cartFetch.total_items}
          data={data}
          categories={categories}
        />
        <Header />
        <Products setCart={setCart} data={val2}></Products>
      </div>
    );
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
      <Products
        setCart={setCart}
        {...(val3 == 1 && val2.length == 0 ? { data: data } : { data: val2 })}
      ></Products>
      {PagesCount !== 1 ? (
        <Pagination
          color="secondary"
          onChange={function (event, page) {
            console.log(page);
            dispatch(FetchAllProducts(page, LIMIT));
            dispatch(SetPaginatedSite(page));
          }}
          className={styles.ContainerForPagination}
          count={PagesCount}
          size="large"
        />
      ) : null}
    </div>
  );
}

/*onClick={()=> func(session.user.name, session.user.email) */
