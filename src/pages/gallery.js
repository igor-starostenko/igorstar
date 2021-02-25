import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
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

export const query = graphql`
  query GalleryQuery {
    galleryJson {
      title
    }
    images: allS3ImageAsset(
      sort: { fields: Key, order: DESC }
      filter: { Key: { regex: "/^gallery/.*$/" } }
    ) {
      edges {
        image: node {
          key: Key
          childImageSharp {
            original {
              height
              width
            }
            fluid(maxHeight: 1280, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;
