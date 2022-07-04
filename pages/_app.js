import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
import reducers from "../reducers";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import React from "react";
import { ThemeProvider } from "next-themes";
function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  ...appProps
}) {
  const getLayout = Component.getLayout || ((page) => page);

  const store = createStore(reducers, compose(applyMiddleware(thunk)));

  /*
  let isLayoutNeeded = [`/prodcs`].includes(appProps.router.pathname);
  console.log(appProps.router.pathname);
  const LayoutComponent = isLayoutNeeded ? Layout : React.Fragment;
*/
  return (
    <SessionProvider session={session}>
      <Layout>
        <Provider store={store}>
          <ThemeProvider>
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </Provider>
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
