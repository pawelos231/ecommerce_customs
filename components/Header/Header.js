import { useSelector, useDispatch } from "react-redux";
import styles from "../../styles/Header/Header.module.sass";
import Image from "next/image";
import { useTheme } from "next-themes";
import { shimmer, toBase64 } from "../ShimmerEffect/Shimmer";
import { useEffect, useState } from "react";
const Header = () => {
  const val2 = useSelector((state) => {
    return state;
  });
  const [opened, onHandleOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const len = val2.SwitchLan.language;
  useEffect(() => {
    onHandleOpen(true);
  });
  if (!opened) {
    return (
      <header className={styles.mainContainer}>
        <div className={styles.pasek}>
          {len == "pl" ? (
            <p>Witam cię na sklepie</p>
          ) : (
            <p>Welcome to BB Customs</p>
          )}
        </div>
        <div className={styles.navBarForCategories}>
          <ul>
            <li>JACKETS</li>
            <li>SHOES</li>
            <li>NEW</li>
            <li>PROMOTIONS</li>
            <li>OTHER</li>
            <li>CONTACT</li>
          </ul>
        </div>
        <div className={styles.heartIntoStyle}>
          <div>
            <Image
              src={"/logoBasia.png"}
              width={533}
              height={700}
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(100, 60)
              )}`}
              quality={40}
              alt="header image logo"
              placeholder="blur"
              priority
            />
          </div>
          <div className={styles.heart}>
            <h1>
              <span>Put your </span> Heart into style
            </h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos,
              cumque expedita? Architecto cumque expedita consequuntur, numquam
              facere recusandae dignissimos sequi modi minima ex at voluptatem,
              reprehenderit facilis tenetur. Pariatur, amet.
            </p>
          </div>
        </div>
      </header>
    );
  }
  return (
    <header className={styles.mainContainer} data-ison={theme}>
      <div className={styles.pasek}>
        {len == "pl" ? (
          <p>Witam cię na sklepie</p>
        ) : (
          <p>Welcome to BB Customs</p>
        )}
      </div>
      <div className={styles.navBarForCategories} data-ison={theme}>
        <ul>
          <li>JACKETS</li>
          <li>SHOES</li>
          <li>NEW</li>
          <li>PROMOTIONS</li>
          <li>OTHER</li>
          <li>CONTACT</li>
        </ul>
      </div>
      <div className={styles.heartIntoStyle}>
        <div>
          <Image
            src={"/logoBasia.png"}
            width={533}
            height={700}
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(100, 60)
            )}`}
            quality={40}
            alt="header image logo"
            placeholder="blur"
            priority
          />
        </div>
        <div className={styles.heart}>
          <h1>
            <span>BB customs, </span> Heart into style
          </h1>
          <p>
            Strona poświęcona customs, sprzedająca najwyższej klasy customowe
            kurtki oraz customowe buty. Szeroki wybór pozwala na dobranie
            ciuchów idealnie pod twoje oczekiwania. Jeżeli wybór wciąż byłby dla
            ciebie za mały, zawsze możesz do mnie napisać w wiadomości
            dołączonej obok każdego produktu, mam nadzieję że moje prace ci się
            spodobają i że za niedługo będziesz już mógł się cieszyć produktem !
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
