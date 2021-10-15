import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/layout';
import Box from 'components/box';
import Gallery from 'components/gallery';
import Head from 'components/head';
import Title from 'components/title';

const GalleryPage = ({ data }) => (
  <Layout>
    <Head pageTitle={data.galleryJson.title} />
    <Box>
      <Title as="h2" size="large">
        {data.galleryJson.title}
      </Title>
      <div style={{ margin: '0 -4rem' }}>
        {data.images.edges.length > 0 && (
          <Gallery photos={data.images.edges} targetRowHeight={250} />
        )}
      </div>
    </Box>
  </Layout>
);

GalleryPage.propTypes = {
  data: PropTypes.shape({
    galleryJson: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
    images: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          image: PropTypes.object,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default GalleryPage;
