import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { Typography } from "@material-ui/core";
import styles from "../../styles/navbar.module.sass";
import { ShoppingCart, Favorite, MenuOutlined } from "@material-ui/icons";
import { IconButton, Badge } from "@material-ui/core";
import { useEffect } from "react";
import Switch from "./switchers/switch";
import Link from "next/link";
import { useRouter } from "next/router";
import SwitchLan from "./switchers/switchLan";
import { useState } from "react";
import LeftMenu from "./LeftMenu/leftmenu";
import { motion, useCycle } from "framer-motion";
import { useRef } from "react";
import SearchBar from "./switchers/SeatchBar";
import { useTheme } from "next-themes";
import useStyles from "./style";
const func = async (identity) => {
  await fetch(`/api/userDatabase/${identity}`)
    .then((response) => response.json())
    .then((data) => console.log(data.data[0]._id.$oid));
};

const Navbar = ({ totaltems, data, categories }) => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const { theme, setTheme } = useTheme();
  const containerRef = useRef(null);
  const { data: session } = useSession();
  const router = useRouter();
  const [opened, onHandleOpen] = useState(false);
  const onHandleOpenMenu = () => {
    onHandleOpen(!opened);
    const div = document.querySelector(".navbar_lefty__yPSQk");
    toggleOpen();
    if (opened == false) {
      div.style.marginTop = "15px";
      div.style.transition = "0.2s";
      for (let i = 0; i < 3; i++) {
        div.children[i].style.transition = ".2s";
      }
      //cursed, and definetlly to fix
      div.children[0].style.display = "none";
      div.children[1].style.width = "50px";
      div.children[1].style.position = "absolute";
      div.children[1].style.transform = "rotate(45deg)";
      div.children[2].style.transform = "rotate(-45deg)";
      div.children[2].style.width = "50px";
    } else {
      div.style.marginTop = "5px";
      div.children[0].style = "none";
      div.children[1].style = "none";
      div.children[2].style = "none";
    }
  };
  const classes = useStyles();
  useEffect(() => {
    if (session) {
      func(session.user.id);
    }
  }, [session, router.pathname]);

  if (session) {
    return (
      <>
        <nav className={styles.mainConForList} data-ison={theme}>
          <motion.div
            className={styles.lefty}
            onClick={() => {
              onHandleOpenMenu();
              console.log(isOpen);
            }}
            data-ison={theme}
          >
            <div data-ison={theme}></div>
            <div data-ison={theme}></div>
            <div data-ison={theme}></div>
          </motion.div>
          <SwitchLan />
          <ul>
            <div className={styles.mainRight}>
              <b> {session.user.name}</b> <br />
              <button onClick={() => signOut()}>Sign out</button>
              <div className={styles.ImageCon}>
                <Link href={`/user`}>
                  <div>
                    <Image
                      src={session.user.image}
                      width={40}
                      height={40}
                      alt={`photo of${session.user.name}`}
                      layout="responsive"
                      objectFit="cover"
                    />
                  </div>
                </Link>
              </div>
            </div>

            <div className={styles.leftCart}>
              <IconButton
                component={motion.div}
                whileHover={{
                  scale: 1.07,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.97 }}
              >
                <Badge badgeContent={totaltems} color="secondary">
                  <Link href={"/cart"}>
                    <ShoppingCart
                      className={
                        String(theme) === "dark"
                          ? classes.root
                          : classes.darkRoot
                      }
                    />
                  </Link>
                </Badge>
              </IconButton>
              <IconButton
                component={motion.div}
                whileHover={{
                  scale: 1.07,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.97 }}
              >
                <Link href={"/user/Favourite"}>
                  <Favorite
                    className={
                      String(theme) === "dark" ? classes.root : classes.darkRoot
                    }
                  />
                </Link>
              </IconButton>
            </div>

            <Typography>
              <Link href={"/"}>
                <div className={styles.Aquatta}>
                  <Image
                    src={"/logo.png"}
                    width={140}
                    height={140}
                    alt="logo_BB"
                  />
                </div>
              </Link>
            </Typography>
            <SearchBar data={data} />
          </ul>
        </nav>
        <Switch />
        {router.pathname == "/" ? (
          <LeftMenu
            IsOpen={isOpen}
            opened={opened}
            categories={categories}
            data={data}
          />
        ) : null}
      </>
    );
  }
  return (
    <>
      <nav className={styles.mainConForList}>
        <motion.div
          className={styles.lefty}
          onClick={() => {
            onHandleOpenMenu();
            console.log(isOpen);
          }}
          data-ison={theme}
        >
          <div data-ison={theme}></div>
          <div data-ison={theme}></div>
          <div data-ison={theme}></div>
        </motion.div>
        <SwitchLan />
        <ul>
          <div className={styles.clas}>
            <button onClick={() => signIn()}>Log in</button>
          </div>
          <div className={styles.leftCart}>
            <IconButton>
              <Badge badgeContent={totaltems} color="secondary">
                <Link href={"/cart"}>
                  <ShoppingCart />
                </Link>
              </Badge>
            </IconButton>
          </div>
          <Typography>
            <Link href={"/"}>
              <div className={styles.Aquatta}>
                <Image
                  src={"/logo.png"}
                  width={140}
                  height={140}
                  alt="logo_BB"
                />
              </div>
            </Link>
          </Typography>
          <SearchBar data={data} />
        </ul>
      </nav>
      <Switch />
      {router.pathname == "/" ? (
        <LeftMenu
          IsOpen={isOpen}
          opened={opened}
          categories={categories}
          data={data}
        />
      ) : null}
    </>
  );
};
/*func(session.user.name, session.user.email);*/
export default Navbar;
