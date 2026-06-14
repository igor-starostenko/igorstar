import PropTypes from 'prop-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Layout from 'components/layout/layout.jsx';
import { Container } from 'components/layout/layout.css.js';
import Box from 'components/box/box.jsx';
import Head from 'components/head/head.jsx';
import Selfie from 'components/selfie/selfie.jsx';

const About = ({ page }) => (
  <Layout>
    <Head pageTitle={page.title} />
    <Selfie src="/selfie.webp" />
    <Box style={{ paddingTop: '1rem' }}>
      {documentToReactComponents(page.content)}
    </Box>
  </Layout>
);

About.propTypes = {
  page: PropTypes.object.isRequired,
};

export default About;

export const getStaticProps = async () => {
  const { getEntries } = await import('contentClient');

  const pages = await getEntries({
    content_type: 'page',
    'fields.title': 'About',
  });

  const page = pages.items[0];

  if (!page) {
    return { notFound: true };
  }

  return {
    props: {
      page,
    },
  };
};
