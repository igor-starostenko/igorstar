const schemaGenerator = ({
  canonical,
  siteUrl,
  _pageTitle,
  siteTitle,
  pageTitleFull,
}) => {
  const websiteSchema = {
    '@type': 'WebSite',
    url: siteUrl,
    name: siteTitle,
  };

  const pageSchema = {
    '@type': 'WebPage',
    url: canonical,
    name: pageTitleFull,
  };

  const graph = [websiteSchema, pageSchema];

  // Use @graph pattern to avoid Safari bug with array root
  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
};

export default schemaGenerator;
