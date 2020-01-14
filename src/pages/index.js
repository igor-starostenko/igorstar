import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import { css } from 'styled-components';
import Layout from 'components/layout';
import Box from 'components/box';
import Title from 'components/title';
// import Gallery from 'components/gallery';

const Index = ({ data }) => (
  <Layout>
    <Box>
      <Title as="h2" size="large">
        {data.homeJson.content.childMarkdownRemark.rawMarkdownBody}
      </Title>
      {/* Hide gallery for now
        <Gallery items={data.homeJson.gallery} />
      */}
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <Link
            to={node.fields.slug}
            css={css`
              text-decoration: none;
              color: inherit;
            `}
          >
            <h3
              css={css`
                margin-bottom: 1rem;
              `}
            >
              {node.frontmatter.title}{' '}
              <span
                css={css`
                  color: #bbb;
                `}
              >
                — {node.frontmatter.date}
              </span>
            </h3>
            <p>{node.excerpt}</p>
          </Link>
        </div>
      ))}
    </Box>
  </Layout>
);

Index.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Index;

// const imageQuery = graphql`
//   query GalleryQuery {
//     homeJson {
//       gallery {
//         title
//         copy
//         image {
//           childImageSharp {
//             fluid(maxHeight: 500, quality: 90) {
//               ...GatsbyImageSharpFluid_withWebp
//             }
//           }
//         }
//       }
//     }
//   }
// `;

export const query = graphql`
  query HomepageQuery {
    homeJson {
      title
      content {
        childMarkdownRemark {
          html
          rawMarkdownBody
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { eq: false } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;
