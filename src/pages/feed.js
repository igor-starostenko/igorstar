import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from 'components/layout';
import Box from 'components/box';
import Gallery from 'components/gallery';
import Head from 'components/head';
import Title from 'components/title';

const FeedPage = ({ data }) => (
  <Layout>
    <Head pageTitle={data.feedJson.title} />
    <Box>
      <Title as="h2" size="large">
        {data.feedJson.title}
      </Title>
      <div style={{ margin: '0 -4rem' }}>
        {data.images.edges.length > 0 && (
          <Gallery
            photos={data.images.edges}
            captions={data.feedJson.captions}
            targetRowHeight={250}
          />
        )}
      </div>
    </Box>
  </Layout>
);

FeedPage.propTypes = {
  data: PropTypes.shape({
    feedJson: PropTypes.shape({
      title: PropTypes.string.isRequired,
      captions: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          desc: PropTypes.string,
          location: PropTypes.string,
          date: PropTypes.date,
        })
      ),
    }).isRequired,
    images: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          image: PropTypes.object.isRequired,
        })
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default FeedPage;

export const query = graphql`
  query FeedQuery {
    feedJson {
      title
      captions {
        name
        desc
        location
        date
      }
    }
    images: allS3ImageAsset(
      sort: { fields: Key, order: DESC }
      filter: { Key: { regex: "/^feed/.*$/" } }
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
