import React from 'react';
import PropTypes from 'prop-types';
import { getEntries, parseFields } from 'contentClient';
import Layout from 'components/layout';
import Box from 'components/box';
import Head from 'components/head';
import Title from 'components/title';
import Article from 'components/article';

const Index = ({ page, posts }) => (
  <Layout>
    <Head pageTitle={page.title} />
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
        <Title as="h1" size="large">
          {page.title}
        </Title>
        <span>{posts.total} Posts</span>
      </div>
      <div>
        {posts.items.map((post, index) => (
          <Article
            key={post.id}
            index={index}
            image={post.thumbnail}
            path={post.path}
            title={post.title}
            date={post.date}
            description={post.description}
            tags={post.tags}
            linkText={post.linkText}
          />
        ))}
      </div>
    </Box>
  </Layout>
);

Index.propTypes = {
  page: PropTypes.shape({
    id: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    title: PropTypes.string.isRequired,
  }).isRequired,
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
      }).isRequired
    ),
    linkText: PropTypes.string,
  }).isRequired,
};

export default Index;

export const getStaticProps = async () => {
  const pages = await getEntries({
    content_type: 'page',
    'fields.title': 'Blog',
  });

  let posts = { items: [] };
  // Ensure we load all posts, regardless of the API limit
  while (posts.total != 0 && posts.items.length < (posts.total || 1)) {
    let response = await getEntries({
      content_type: 'post',
      order: '-fields.date',
      limit: 1000, // 1000 is the max
      skip: posts.items.length,
    });
    posts = { ...response, items: [...posts.items, ...response.items] };
  }

  return {
    props: {
      page: pages.items[0] || {},
      posts: {
        ...posts,
        /* eslint-disable no-unused-vars */
        items: posts.items.map(({ thumbnail, images, ...fields }) => ({
          thumbnail: parseFields(thumbnail),
          ...fields,
        })),
      },
    },
  };
};
