import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Layout from 'components/layout';
import Box from 'components/box';

const Post = ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <Box>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </Box>
    </Layout>
  );
};

Post.propTypes = {
  data: PropTypes.object.isRequired,
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;

export default Post;
