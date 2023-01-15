import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import config from '../../site-config';

const { siteTitle, siteDescription, themeColor, social } = config;

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <meta content="IE=edge" httpEquiv="X-UA-Compatible" />

          <meta content={siteTitle} name="apple-mobile-web-app-title" />
          <meta content={siteDescription} name="description" />
          <meta content={siteDescription} property="og:description" />
          <meta content={siteDescription} name="twitter:description" />

          <meta content="yes" name="apple-mobile-web-app-capable" />
          <meta
            content="black-translucent"
            name="apple-mobile-web-app-status-bar-style"
          />
          <meta content={themeColor} name="theme-color" />
          <meta content={siteTitle} name="application-name" />

          <meta content="website" property="og:type" />
          <meta content={siteTitle} property="og:site_name" />
          <meta content="summary_large_image" name="twitter:card" />
          <meta content={`@${social.twitter}`} name="twitter:site" />
          <meta content={`@${social.twitter}`} name="twitter:creator" />

          <meta content={themeColor} name="msapplication-TileColor" />
          <meta
            content="/icons/mstile-70x70.png"
            name="msapplication-square70x70"
          />
          <meta
            content="/icons/mstile-144x144.png"
            name="msapplication-square144x144"
          />
          <meta
            content="/icons/mstile-150x150.png"
            name="msapplication-square150x150"
          />
          <meta
            content="/icons/mstile-310x150.png"
            name="msapplication-wide310x150"
          />
          <meta
            content="/icons/mstile-310x310.png"
            name="msapplication-square310x310"
          />

          <link rel="manifest" href="/manifest.webmanifest" />

          <link
            href="/icons/apple-touch-icon-57x57.png"
            rel="apple-touch-icon"
            sizes="57x57"
          />
          <link
            href="/icons/apple-touch-icon-60x60.png"
            rel="apple-touch-icon"
            sizes="60x60"
          />
          <link
            href="/icons/apple-touch-icon-72x72.png"
            rel="apple-touch-icon"
            sizes="72x72"
          />
          <link
            href="/icons/apple-touch-icon-76x76.png"
            rel="apple-touch-icon"
            sizes="76x76"
          />
          <link
            href="/icons/apple-touch-icon-114x114.png"
            rel="apple-touch-icon"
            sizes="114x114"
          />
          <link
            href="/icons/apple-touch-icon-120x120.png"
            rel="apple-touch-icon"
            sizes="120x120"
          />
          <link
            href="/icons/apple-touch-icon-144x144.png"
            rel="apple-touch-icon"
            sizes="144x144"
          />
          <link
            href="/icons/apple-touch-icon-152x152.png"
            rel="apple-touch-icon"
            sizes="152x152"
          />
          <link
            href="/icons/apple-touch-icon-167x167.png"
            rel="apple-touch-icon"
            sizes="167x167"
          />
          <link
            href="/icons/apple-touch-icon-180x180.png"
            rel="icon"
            sizes="180x180"
            type="image/png"
          />

          <link
            href="/icons/favicon-32x32.png"
            rel="icon"
            sizes="32x32"
            type="image/png"
          />
          <link
            href="/icons/favicon-16x16.png"
            rel="icon"
            sizes="16x16"
            type="image/png"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
