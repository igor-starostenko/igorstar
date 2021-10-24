import React from 'react';
import PropTypes from 'prop-types';
import { getEntries, parseItem } from 'contentClient';
import Layout from 'components/layout';
import Box from 'components/box';
import Gallery from 'components/gallery';
import Head from 'components/head';
import Title from 'components/title';

const FeedPage = ({ page, feed }) => (
  <Layout>
    <Head pageTitle={page.title} />
    <Box>
      <Title as="h2" size="large">
        {page.title}
      </Title>
      <div style={{ margin: '0 -4rem' }}>
        {feed.images.length > 0 && (
          <Gallery photos={feed.images} targetRowHeight={250} order="desc" />
        )}
      </div>
    </Box>
  </Layout>
);

FeedPage.propTypes = {
  page: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  feed: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export const getStaticProps = async () => {
  const pages = await getEntries({
    content_type: 'page',
    'fields.title': 'Photo Feed',
  });
  const { items, ...feed } = await getEntries({ content_type: 'feed' });

  return {
    props: {
      page: pages.items[0] || {},
      feed: {
        ...feed,
        images: items
          ? items.map(({ image, description, ...fields }) => ({
              caption: description,
              ...fields,
              ...parseItem(image),
            }))
          : [],
      },
    },
  };
};

export default FeedPage;
