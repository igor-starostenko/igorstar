import PropTypes from 'prop-types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import schemaGenerator from 'helpers/schemaGenerator.js';

const appendSiteUrl = (siteUrl, imageUrl) => {
  const origin =
    typeof window === 'undefined' ? siteUrl : window.location.origin;
  return imageUrl.startsWith('http') ? imageUrl : `${origin}${imageUrl}`;
};

const SEO = ({
  siteTitle,
  siteTitleShort,
  siteUrl,
  pageTitle,
  pageTitleFull = pageTitle ? `${siteTitleShort}: ${pageTitle}` : siteTitle,
  imageUrl,
  canonical,
}) => {
  const router = useRouter();
  const pathname = router.pathname;
  const fullUrl = canonical || siteUrl + (pathname || '');
  const schemaJson = JSON.stringify(
    schemaGenerator({
      pathname,
      canonical: fullUrl,
      siteUrl,
      pageTitle,
      siteTitle,
      pageTitleFull,
    })
  );

  return (
    <Head>
      <meta
        content="width=device-width,initial-scale=1.0,user-scalable=yes"
        name="viewport"
      />
      <meta content={pageTitleFull} property="og:title" />
      <meta content={pageTitleFull} name="twitter:title" />
      <title>{pageTitleFull}</title>

      <meta content={pageTitleFull} name="twitter:text:title" />
      <meta content={fullUrl} property="OG:URL" />
      <meta content={fullUrl} name="twitter:url" />
      <link rel="canonical" href={fullUrl} />

      <meta
        content={appendSiteUrl(siteUrl, imageUrl || '/social.png')}
        property="og:image"
      />
      <meta content="1024" property="og:image:width" />
      <meta content="512" property="og:image:height" />
      <meta
        content={appendSiteUrl(siteUrl, imageUrl || '/social.png')}
        name="twitter:image"
      />
      <meta content="1024" name="twitter:image:width" />
      <meta content="512" name="twitter:image:height" />

      {/* Schema.org JSON-LD - using @graph pattern to avoid Safari bug */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            schemaGenerator({
              pathname,
              canonical: fullUrl,
              siteUrl,
              pageTitle,
              siteTitle,
              pageTitleFull,
            })
          ),
        }}
      />
    </Head>
  );
};

SEO.propTypes = {
  siteTitle: PropTypes.string,
  siteTitleShort: PropTypes.string,
  siteUrl: PropTypes.string,
  canonical: PropTypes.string,
  pageTitle: PropTypes.string,
  pageTitleFull: PropTypes.string,
  imageUrl: PropTypes.string,
};

const config = {
  siteTitle: 'Blog Site',
  siteTitleShort: 'Site',
  siteUrl: 'https://example.com',
};

const ConfigSEO = (props) => <SEO {...config} {...props} />;

export default ConfigSEO;