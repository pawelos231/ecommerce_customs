import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import styles from "../../styles/UserDetails/userDetails.module.sass";
import UserDetailsComponent from "../../components/UserDetails/userDetailsComponent";
import Navbar from "../../components/Navbar/Navbar";
import { fetchCart } from "../../actions/fetchcommerceCart";
import NestedLayout from "../../components/Layouts/layouUserInterface";
const getServerSideProps = async () => {
  //database data from all orders of an client
};

const UserDetails = () => {
  const valueOfColor = useSelector((state) => {
    return state.SwitchToggle;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCart());
  }, []);
  let valueOfCart = useSelector((state) => {
    return state.cartFetch.total_items;
  });
  console.log(valueOfCart);
  return (
    <>
      <div className={styles.container} data-ison={valueOfColor}>
        <h1>Twoje zamówienia</h1>
        <UserDetailsComponent />
      </div>
    </>
  );
};

UserDetails.getLayout = (page) => {
  return <NestedLayout>{page}</NestedLayout>;
};

export default UserDetails;
