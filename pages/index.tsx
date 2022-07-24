import Products from "../components/Products/Products";
import { fetchCart } from "../actions/fetchcommerceCart";
import { useEffect, useState } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import styles from "../styles/main.module.sass";
import { setCart } from "../actions/setCart";
import { commerce } from "../lib/commerce";
import Header from "../components/Header/Header";
import { FetchAllProducts } from "../actions/ProductsAction";
import { useTheme } from "next-themes";
import { Pagination } from "@mui/material";
import { SetPaginatedSite } from "../actions/Pagination";
import useWindowSize from "../hooks/useWindowResize";
import { SetSized } from "../interfaces/interfacesAboutUserDetails";
import dynamic from "next/dynamic";
import { LIMIT } from "../constants/LimitProductsPerPage";
const DynamicNavbarForComputer = dynamic(
  () => import("../components/Navbar/Navbar")
);
const DynamicNavbarForPhone = dynamic(
  () => import("../components/NavbarForPhone/NavbarPhone")
);
export async function getStaticProps() {
  const { data }: any = await commerce.products.list({
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
    revalidate: 1,
  };
}

export default function Component({ data, categories, pagination, LIMIT }) {
  const dispatch = useDispatch();
  const size: SetSized = useWindowSize();
  console.log(size);

  const combined = async () => {
    //dispatch(FetchAllProducts());
    dispatch(fetchCart());
  };
  const { theme, setTheme } = useTheme();

  const ProductsFetchedFromApiFromRedux: any = useSelector(
    (state: RootStateOrAny) => {
      return state.ProductsHandle.prodcs;
    }
  );
  console.log(ProductsFetchedFromApiFromRedux);
  const NumberOfPaginatedSite: number = useSelector((state: RootStateOrAny) => {
    return state.Pagination;
  });
  const cartProductAdd: any = useSelector((state: RootStateOrAny) => {
    return state;
  });
  console.log(cartProductAdd);

  let PagesCount: number;
  PagesCount = Math.ceil(pagination.count / LIMIT);
  const number = useSelector((state: RootStateOrAny) => {
    return state.ProductsHandle.numberOfPages;
  });
  if (ProductsFetchedFromApiFromRedux != null) {
    PagesCount = number;
  }
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    combined();
    setMounted(true);
  }, [dispatch, cartProductAdd.cartAdd.cart]);
  if (!mounted) {
    return (
      <div className={styles.mainContainer}>
        <DynamicNavbarForComputer
          totaltems={cartProductAdd.cartFetch.total_items}
          data={data}
          categories={categories}
        />
        <Header />
        <Products
          setCart={setCart}
          data={ProductsFetchedFromApiFromRedux}
        ></Products>
      </div>
    );
  }
  return (
    <div className={styles.mainContainer} data-ison={theme}>
      {size.width > 720 ? (
        <DynamicNavbarForComputer
          totaltems={cartProductAdd.cartFetch.total_items}
          data={data}
          categories={categories}
        />
      ) : (
        <DynamicNavbarForPhone />
      )}
      <Header />
      <Products
        setCart={setCart}
        {...(NumberOfPaginatedSite == 1 &&
        ProductsFetchedFromApiFromRedux == null
          ? { data: data }
          : { data: ProductsFetchedFromApiFromRedux })}
      ></Products>
      {PagesCount !== 1 ? (
        <Pagination
          color="secondary"
          onChange={function (event, page) {
            console.log(page);
            dispatch(FetchAllProducts(page, PagesCount));
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
