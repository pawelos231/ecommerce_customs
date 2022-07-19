import { Menu, CloseOutlined } from "@material-ui/icons";
import styles from "../../styles/navbars/NavbarPhone/NavbarPhoneView.module.sass";
import { useTheme } from "next-themes";
import { useState } from "react";
const NavbarPhone = () => {
  const [OpenHamburgerMenu, HandleOpenerOfHamburgerMenu] =
    useState<boolean>(false);
  console.log(OpenHamburgerMenu);
  const { theme, setTheme } = useTheme();
  return (
    <div className={styles.ContainerForAllLayout} data-ison={theme}>
      <div onClick={() => HandleOpenerOfHamburgerMenu(!OpenHamburgerMenu)}>
        {!OpenHamburgerMenu ? (
          <Menu fontSize="inherit" />
        ) : (
          <CloseOutlined fontSize="inherit" />
        )}
      </div>
    </div>
  );
};

export default NavbarPhone;
