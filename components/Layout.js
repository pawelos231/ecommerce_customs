import Head from "next/head";
import Footer from "./Footer/Footer";
const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;1,400;1,500&family=Hahmlet:wght@100;200;300;500;600&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="canonical" href="https://ecommerce-basia.vercel.app" />
        <link
          rel="alternate"
          href="https://ecommerce-basia.vercel.app"
          hreflang="en-us"
        />
        <title>BB Customs</title>

        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <meta
          name="keywords"
          content="Custom, design, customowe kurtki, customowe buty, customowe bluzki, malowane, ręcznie"
        />
        <meta
          name="description"
          content="Sklep ecommerce sprzedający wysokiej jakości kurtki oraz buty, szeroki wybór w customach oraz możliwość dodania własnych możliwości"
        />
        <meta name="author" content="Pawelos" />
      </Head>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
