import React from 'react';
import PropTypes from 'prop-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Layout from 'components/layout';
import Box from 'components/box';
import Head from 'components/head';
import Selfie from 'components/selfie';

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

  return {
    props: {
      page: pages.items[0],
    },
  };
};
