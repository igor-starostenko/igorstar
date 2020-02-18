import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import get from 'lodash/get';
import Layout from 'components/layout';
import Box from 'components/box';
import Head from 'components/head';
import Selfie from 'components/selfie';

const About = ({ data }) => (
  <Layout>
    <Head pageTitle={data.aboutJson.title} />
    <Selfie fluid={get(data, 'images.edges[0].node.fluid')} />
    <Box style={{ paddingTop: '1rem' }}>
      <div
        dangerouslySetInnerHTML={{
          __html: data.aboutJson.content.childMarkdownRemark.html,
        }}
      />
    </Box>
  </Layout>
);

About.propTypes = {
  data: PropTypes.object.isRequired,
};

export default About;

export const query = graphql`
  query AboutQuery {
    aboutJson {
      title
      content {
        childMarkdownRemark {
          html
        }
      }
    }
    images: allImageSharp(
      filter: { fluid: { originalName: { eq: "selfie.jpg" } } }
      limit: 1
    ) {
      edges {
        node {
          fluid(cropFocus: CENTER) {
            originalName
            srcSet
            src
            sizes
            aspectRatio
          }
        }
      }
    }
  }
`;
