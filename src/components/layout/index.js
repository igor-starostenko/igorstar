import React from 'react';
import PropTypes from 'prop-types';
// import { StaticQuery, graphql } from 'gatsby';
import Head from 'components/head';
import Header from 'components/header';
import Footer from 'components/footer';
import GlobalStyle from 'global.css.js';
import config from '../../../site-config';
import { Content } from './layout.css';

const Layout = ({ config, children }) => {
  const { siteTitleShort, author, social } = config;

  return (
    <div style={{ height: '100%' }}>
      <GlobalStyle />
      <Head />
      <Header title={siteTitleShort} />
      <Content>{children}</Content>
      <Footer author={author} social={social} />
    </div>
  );
};

Layout.propTypes = {
  config: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

// const LayoutWithQuery = props => (
//   <StaticQuery
//     query={graphql`
//       query LayoutQuery {
//         site {
//           siteMetadata {
//             author
//             siteTitleShort
//             social {
//               fivehundredpx
//               flickr
//               github
//               linkedin
//               twitter
//               youtube
//             }
//           }
//         }
//       }
//     `}
//     render={data => <Layout data={data} {...props} />}
//   />
// );

const LayoutWithConfig = props => <Layout config={config} {...props} />;

LayoutWithConfig.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutWithConfig;
