import PropTypes from 'prop-types';
import Head from 'next/head';
import schemaGenerator from 'helpers/schemaGenerator';
import { useRouter } from 'next/router';
import config from '../../../site-config';

const appendSiteUrl = (siteUrl, imageUrl) => {
  const origin =
    typeof window === 'undefined' ? siteUrl : window.location.origin;
  return imageUrl.startsWith('http') ? imageUrl : `${origin}${imageUrl}`;
};

// Extends Head with addition page specific tags
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

      <script type="application/ld+json">
        {JSON.stringify(
          schemaGenerator({
            pathname,
            canonical: fullUrl,
            siteUrl,
            pageTitle,
            siteTitle,
            pageTitleFull,
          })
        )}
      </script>
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

const ConfigSEO = (props) => <SEO {...config} {...props} />;

export default ConfigSEO;
