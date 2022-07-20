import styles from "../styles/notFound.module.sass";
import Link from "next/link";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { SetSized } from "../interfaces/interfacesAboutUserDetails";
import useWindowSize from "../hooks/useWindowResize";
const DynamicNavbarForComputer = dynamic(
  () => import("../components/Navbar/Navbar")
);
const DynamicNavbarForPhone = dynamic(
  () => import("../components/NavbarForPhone/NavbarPhone")
);
const NotFound = () => {
  const { theme, setTheme } = useTheme();
  const size: SetSized = useWindowSize();
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
        <h2>Nic tu nie ma :0</h2>
        <Link href={"/"}>
          <a>
            <button>Powrót do strony głównej</button>
          </a>
        </Link>
      </div>
    </>
  );
};
export const getStaticProps = async () => {
  return {
    props: {},
    revalidate: true,
  };
};

export default NotFound;
