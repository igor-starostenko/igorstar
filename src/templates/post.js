import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Gallery from 'components/gallery';
import Layout from 'components/layout';
import Box from 'components/box';

const Post = ({ data, pageContext }) => {
  const post = data.markdownRemark;
  const images = data.images.edges.filter(({ image }) =>
    `/${image.key}`.includes(pageContext.slug)
  );
  return (
    <Layout>
      <Box>
        <div style={{ margin: '0 -4rem' }}>
          {images.length && (
            <Gallery
              photos={images}
              targetRowHeight={window.innerWidth >= 450 ? 250 : 200}
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
