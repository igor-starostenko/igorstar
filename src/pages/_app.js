import React from 'react';
// import App from 'next/app'
import { AnimatePresence } from 'framer-motion';
import Head from 'components/head';
import GlobalStyle from 'global.css.js';

/* eslint-disable react/prop-types */
const Main = ({ Component, pageProps, router }) => (
  <>
    <GlobalStyle />
    <Head />
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
  </>
);

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// Main.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default Main;
