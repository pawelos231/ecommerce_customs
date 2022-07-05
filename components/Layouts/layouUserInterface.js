import NavbarUser from "../UserDetails/navbar/navbarUser";
import Navbar from "../Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCart } from "../../actions/fetchcommerceCart";
import styles from "../../styles/layouts/layoutUserInterface.module.sass";
import { useTheme } from "next-themes";
const NestedLayout = ({ children }) => {
  const { theme, setTheme } = useTheme();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart());
  }, []);
  let valueOfCart = useSelector((state) => {
    return state.cartFetch.total_items;
  });
  return (
    <>
      <Navbar totaltems={valueOfCart} />
      <main className={styles.container} data-ison={theme}>
        <div>{children}</div>
        <NavbarUser />
      </main>
    </>
  );
};

export default NestedLayout;
