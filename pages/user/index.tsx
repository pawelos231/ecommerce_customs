import { useEffect } from "react";

//redux
import { fetchCart } from "../../actions/fetchcommerceCart";
import { useDispatch } from "react-redux";

//styles
import styles from "../../styles/UserDetails/userDetails.module.sass";
import { useTheme } from "next-themes";

//components
import NestedLayout from "../../components/Layouts/layouUserInterface";
import UserDetailsComponent from "../../components/UserDetails/userDetailsComponent";

const UserDetails = () => {
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    dispatch(fetchCart());
  }, []);
  return (
    <>
      <div className={styles.container} data-ison={theme}>
        <h1>Twoje zamówienia</h1>
        <UserDetailsComponent />
      </div>
    </>
  );
};

UserDetails.getLayout = (page: any) => {
  return <NestedLayout>{page}</NestedLayout>;
};

export default UserDetails;
