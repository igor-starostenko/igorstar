import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Head from 'components/head';
import Header from 'components/header';
import { Content } from './layout.css';
import Footer from 'components/footer';
import GlobalStyle from 'global.css.js';

const Layout = ({ data, children }) => {
  const { siteTitle, author, social } = data.site.siteMetadata;

  return (
    <div style={{ height: '100%' }}>
      <GlobalStyle />
      <Head />
      <Header title={siteTitle} />
      <Content>{children}</Content>
      <Footer author={author} social={social} />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.object.isRequired,
};

const LayoutWithQuery = props => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        site {
          siteMetadata {
            author
            siteTitle
            social {
              fivehundredpx
              flickr
              github
              instagram
              linkedin
              twitter
              youtube
            }
          }
        }
      }
    `}
    render={data => <Layout data={data} {...props} />}
  />
);

LayoutWithQuery.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutWithQuery;
