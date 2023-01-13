// import App from 'next/app'
import { AnimatePresence } from 'framer-motion';
import GlobalStyle from 'global.css.js';

/* eslint-disable react/prop-types */
const MyApp = ({ Component, pageProps, router }) => (
  <>
    <GlobalStyle />
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
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
