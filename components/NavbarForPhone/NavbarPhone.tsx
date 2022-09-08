import { Menu, CloseOutlined } from "@material-ui/icons";
import styles from "../../styles/navbars/NavbarPhone/NavbarPhoneView.module.sass";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
const NavbarPhone = () => {
  const [OpenHamburgerMenu, HandleOpenerOfHamburgerMenu] =
    useState<boolean>(false);
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  if (session) {
    return (
      <div className={styles.ContainerForAllLayout} data-ison={theme}>
        <div onClick={() => HandleOpenerOfHamburgerMenu(!OpenHamburgerMenu)}>
          {!OpenHamburgerMenu ? (
            <Menu fontSize="inherit" />
          ) : (
            <CloseOutlined fontSize="inherit" />
          )}
        </div>
        <div className={styles.ContainerForLogged}>
          <button
            className={styles.ButtonForLoggedInfUser}
            onClick={() => signOut()}
          >
            Wyloguj
          </button>
          <div className={styles.ContainerForImage}>
            <Image
              src={session.user.image}
              width={40}
              height={40}
              layout="responsive"
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.ContainerForAllLayout} data-ison={theme}>
        <div onClick={() => HandleOpenerOfHamburgerMenu(!OpenHamburgerMenu)}>
          {!OpenHamburgerMenu ? (
            <Menu fontSize="inherit" />
          ) : (
            <CloseOutlined fontSize="inherit" />
          )}
        </div>
        <button
          className={styles.ButtonForLoggedOffUser}
          onClick={() => signIn()}
        >
          Zaloguj
        </button>
      </div>
    );
  }
};

export default NavbarPhone;
