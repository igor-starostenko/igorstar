// This does not support nested pages (level 2 and up)
// If you're working with deeply nested pages, remove this or rework it.

const schemaGenerator = ({
  pathname,
  canonical,
  siteUrl,
  pageTitle,
  siteTitle,
  pageTitleFull,
}) => {
  const isSubPage = pathname !== '/';

  // Use @graph pattern to avoid Safari bug with array root
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

  // Always include both WebSite and WebPage in @graph
  const graph = [websiteSchema, pageSchema];

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
};

export default schemaGenerator;
