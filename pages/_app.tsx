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
  const Path: string = appProps.router.pathname;
  let isLayoutNeeded: boolean;
  if (Path == "/" || Path.startsWith("/prodcs")) {
    isLayoutNeeded = true;
  } else {
    isLayoutNeeded = false;
  }
  console.log(appProps.router.pathname);
  const LayoutComponent = isLayoutNeeded ? Layout : React.Fragment;

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <ThemeProvider>
          <LayoutComponent>
            {getLayout(<Component {...pageProps} />)}
          </LayoutComponent>
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
