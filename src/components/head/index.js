import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import schemaGenerator from 'helpers/schemaGenerator';
import { useRouter } from 'next/router';
import config from '../../../site-config';

// Extends Head with addition page specific tags
const SEO = ({
  siteTitle,
  siteTitleShort,
  siteUrl,
  pageTitle,
  pageTitleFull = pageTitle ? `${siteTitleShort}: ${pageTitle}` : siteTitle,
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
};

const ConfigSEO = props => <SEO {...config} {...props} />;

export default ConfigSEO;
