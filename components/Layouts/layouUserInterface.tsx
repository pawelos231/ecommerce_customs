import NavbarUser from "../UserDetails/navbar/navbarUser";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { useEffect } from "react";
import { fetchCart } from "../../actions/fetchcommerceCart";
import styles from "../../styles/layouts/layoutUserInterface.module.sass";
import { useTheme } from "next-themes";
import { SetSized } from "../../interfaces/interfacesAboutUserDetails";
import useWindowSize from "../../hooks/useWindowResize";
import dynamic from "next/dynamic";
const DynamicNavbarForComputer = dynamic(
  () => import("../../components/Navbar/Navbar")
);
const DynamicNavbarForPhone = dynamic(
  () => import("../../components/NavbarForPhone/NavbarPhone")
);
const NestedLayout = ({ children }) => {
  const size: SetSized = useWindowSize();
  const { theme, setTheme } = useTheme();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart());
  }, []);
  let valueOfCart = useSelector((state: RootStateOrAny) => {
    return state.cartFetch.total_items;
  });
  return (
    <>
      {size.width > 720 ? (
        <DynamicNavbarForComputer
          totaltems={valueOfCart}
          data={null}
          categories={null}
        />
      ) : (
        <DynamicNavbarForPhone />
      )}
      <main className={styles.container} data-ison={theme}>
        <div>{children}</div>
        <NavbarUser />
      </main>
    </>
  );
};

export default NestedLayout;
