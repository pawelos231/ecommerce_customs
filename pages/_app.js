import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
import reducers from "../reducers";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import React, { Fragment } from "react";
function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  ...appProps
}) {
  const localStorageKey = "background";
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
  if (typeof window == "undefined") {
    return <></>;
  }
  const getLayout = Component.getLayout || ((page) => page);
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
