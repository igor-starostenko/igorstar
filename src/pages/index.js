import React from 'react';
import PropTypes from 'prop-types';
const contentful = require('contentful');
// import { graphql } from 'gatsby';
// import get from 'lodash/get';
import Layout from 'components/layout';
import Box from 'components/box';
import Title from 'components/title';
import Article from 'components/article';

const Index = ({ posts }) => (
  <Layout>
    <Box>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'baseline',
          justifyItems: 'space-between',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Title as="h2" size="large">
          Test Title
          {/*
          {data.homeJson.title}
          */}
        </Title>
        <h4>{posts.total} Posts</h4>
      </div>
      <div>
        {posts.items.map((post, index) => (
          <Article
            key={post.id}
            index={index}
            image={null}
            slug={post.id}
            title={post.title}
            date={post.date}
            description={post.description}
            tags={post.tags}
          />
        ))}
      </div>
    </Box>
  </Layout>
);

Index.propTypes = {
  posts: PropTypes.shape({
    limit: PropTypes.number.isRequired,
    skip: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        createdAt: PropTypes.string,
        updatedAt: PropTypes.string,
        title: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        layout: PropTypes.string.isRequired,
        draft: PropTypes.bool.isRequired,
        category: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string),
        description: PropTypes.string.isRequired,
        content: PropTypes.object.isRequired,
      }).isRequired
    ),
  }).isRequired,
};

export default Index;

export const getStaticProps = async () => {
  const limit = parseInt(process.env.CONTENTFUL_LIMIT || '100');
  const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_TOKEN,
  });

  const response = await client.getEntries({ content_type: 'post', limit });

  return {
    props: {
      posts: {
        limit: response.limit,
        skip: response.skip,
        total: response.total,
        items: response.items.map(({ sys, fields }) => ({
          id: sys.id,
          createdAt: sys.createdAt,
          updatedAt: sys.updatedAt,
          ...fields,
        })),
      },
    },
  };
};

// export const query = graphql`
//   query HomeQuery {
//     homeJson {
//       title
//     }
//     images: allS3ImageAsset(
//       sort: { fields: Key }
//       filter: { Key: { regex: "^posts/.*-thumb.*/" } }
//     ) {
//       edges {
//         node {
//           Key
//           image: childImageSharp {
//             fluid(maxHeight: 480, quality: 90) {
//               ...GatsbyImageSharpFluid_withWebp
//             }
//           }
//         }
//       }
//     }
//     allMarkdownRemark(
//       sort: { fields: [frontmatter___date], order: DESC }
//       filter: { frontmatter: { draft: { eq: false } } }
//     ) {
//       totalCount
//       edges {
//         node {
//           id
//           frontmatter {
//             title
//             date(formatString: "DD MMMM, YYYY")
//             description
//             tags
//             captions {
//               name
//               desc
//               location
//               date
//             }
//           }
//           fields {
//             slug
//           }
//         }
//       }
//     }
//   }
// `;
