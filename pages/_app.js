/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import NProgress from "nprogress";
import Router from "next/router";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import TagManager from "react-gtm-module";

import Page from "../components/Page";
import "../components/styles/nprogress.css";
import withData from "../lib/withData";
import { CartStateProvider } from "../components/cartState";
import { SearchStateProvider } from "../components/searchState";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const GTM_MANAGER = process.env.NEXT_PUBLIC_GTM_MANAGER;

function MyApp({ Component, pageProps, apollo }) {
  React.useEffect(() => {
    TagManager.initialize({
      gtmId: GTM_MANAGER,
    });
  }, []);
  return (
    <ApolloProvider client={apollo}>
      <CartStateProvider>
        <SearchStateProvider>
          <Page>
            <Component {...pageProps} />
          </Page>
        </SearchStateProvider>
      </CartStateProvider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  pageProps.query = ctx.query;

  return { pageProps };
};

export default withData(MyApp);
