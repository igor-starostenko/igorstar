import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Gallery from 'components/gallery';
import Layout from 'components/layout';
import Box from 'components/box';
import Head from 'components/head';

const calculateRowHeight = imageCount => {
  let multiplier = 3;
  if (typeof window !== 'undefined') {
    multiplier = window.innerWidth > 450 ? 4 : 8;
  }
  const height = 300 * (1 - (multiplier * imageCount) / 100);
  return height > 100 ? height : 100;
};

const Post = ({ data, pageContext }) => {
  const post = data.markdownRemark;
  const images = data.images.edges.filter(({ image }) =>
    `/${image.key}`.includes(pageContext.slug)
  );
  return (
    <Layout>
      <Head pageTitle={post.frontmatter.title} />
      <Box>
        <div style={{ margin: '0 -4rem' }}>
          {images.length > 0 && (
            <Gallery
              photos={images}
              targetRowHeight={calculateRowHeight(images.length)}
            />
          )}
        </div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </Box>
    </Layout>
  );
};

Post.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
    images: allS3ImageAsset(
      sort: { fields: Key }
      filter: { Key: { regex: "/^posts/((?!thumb).)*$/" } }
    ) {
      edges {
        image: node {
          key: Key
          exif: EXIF {
            DateCreatedISO
            ExposureTime
            FNumber
            ShutterSpeedValue
          }
          childImageSharp {
            original {
              height
              width
            }
            fluid(maxHeight: 1920, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;

export default Post;
