import React from 'react';
import {
  getEntries,
  getPosts,
  getCategoriesPaths,
  parseFields,
} from 'contentClient';
import Category from 'components/category';

const CategoryIndex = ({ page, posts }) => (
  <Category page={page} posts={posts} />
);

export const getStaticProps = async ({ params }) => {
  const pages = await getEntries({
    content_type: 'page',
    'fields.title': 'Blog',
  });

  const posts = await getPosts({
    order: '-fields.date',
    limit: 1000, // 1000 is the max,
    'fields.category[in]': params.category,
  });

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

export const getStaticPaths = async () => {
  const paths = await getCategoriesPaths();

  return {
    paths,
    fallback: false,
  };
};

export default CategoryIndex;
