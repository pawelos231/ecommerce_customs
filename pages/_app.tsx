//react and next stuff
import React, { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { EmptyObject } from "react-hook-form";

//auth
import { SessionProvider } from "next-auth/react";

//redux
import thunk from "redux-thunk";
import reducers from "../reducers";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, Store } from "redux";

//Layout
import Layout from "../components/Layout";

//styles
import "../styles/globals.css";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  ...appProps
}: {
  [x: string]: any;
  Component: any;
  pageProps: {
    [x: string]: any;
    session: any;
  };
}) {
  const getLayout: any = Component.getLayout || ((page: ReactNode) => page);

  //create store
  const store: Store<EmptyObject | any> = createStore(
    reducers,
    compose(applyMiddleware(thunk))
  );

  const Path: string = appProps.router.pathname;
  let isLayoutNeeded: boolean;

  if (Path === "/" || Path.startsWith("/prodcs")) {
    isLayoutNeeded = true;
  } else {
    isLayoutNeeded = false;
  }

  const LayoutComponent:
    | (({ children }: { children: any }) => JSX.Element)
    | React.ExoticComponent<{
        children?: React.ReactNode;
      }> = isLayoutNeeded ? Layout : React.Fragment;

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
