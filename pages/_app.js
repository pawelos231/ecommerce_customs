import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
import reducers from "../reducers";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import React, { Fragment } from "react";
import { useEffect, useState } from "react";
function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  ...appProps
}) {
  const getLayout = Component.getLayout || ((page) => page);
  const localStorageKey = "background";
  const [mounted, setMounted] = useState(false);
  let persistedTheme;
  if (typeof window !== "undefined") {
    persistedTheme = localStorage.getItem(localStorageKey);
  }
  let initialState = {
    SwitchToggle: persistedTheme ? JSON.parse(persistedTheme) : {},
  };
  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(thunk))
  );
  console.log(store.getState().SwitchToggle);
  const unsusbribe = store.subscribe(() => {
    const SwitchToggle = store.getState().SwitchToggle;

    localStorage.setItem(localStorageKey, JSON.stringify(SwitchToggle));
  });
  unsusbribe();
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <Layout></Layout>;
  }
  /*
  let isLayoutNeeded = [`/prodcs`].includes(appProps.router.pathname);
  console.log(appProps.router.pathname);
  const LayoutComponent = isLayoutNeeded ? Layout : React.Fragment;
*/
  return (
    <SessionProvider session={session}>
      <Layout>
        <Provider store={store}>
          {getLayout(<Component {...pageProps} />)}
        </Provider>
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
