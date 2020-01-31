import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import get from 'lodash/get';
import Layout from 'components/layout';
import Box from 'components/box';
import Title from 'components/title';
import Article from 'components/article';

const Index = ({ data }) => (
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
          {data.homeJson.content.childMarkdownRemark.rawMarkdownBody}
        </Title>
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      </div>
      <div>
        {data.allMarkdownRemark.edges.map(({ node }, index) => (
          <Article
            key={node.id}
            index={index}
            image={get(
              data.images.edges.find(edge =>
                `/${edge.node.Key}`.includes(node.fields.slug)
              ),
              'node.image'
            )}
            slug={node.fields.slug}
            title={node.frontmatter.title}
            date={node.frontmatter.date}
            description={node.frontmatter.description}
            tags={node.frontmatter.tags}
          />
        ))}
      </div>
    </Box>
  </Layout>
);

Index.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Index;

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
    images: allS3ImageAsset(
      sort: { fields: Key }
      filter: { Key: { regex: "^posts/.*-thumb.*/" } }
    ) {
      edges {
        node {
          Key
          EXIF {
            DateCreatedISO
            ExposureTime
            FNumber
            ShutterSpeedValue
          }
          image: childImageSharp {
            fluid(maxHeight: 480, quality: 90) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
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
            description
            tags
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
