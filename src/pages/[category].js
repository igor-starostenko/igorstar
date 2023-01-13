import React from 'react';
import Category from 'components/category';

const CategoryIndex = ({ page, posts }) => (
  <Category page={page} posts={posts} />
);

export const getStaticProps = async ({ params }) => {
  const { getEntries, getAllEntries, parseItem } = await import(
    'contentClient'
  );

  const pages = await getEntries({
    content_type: 'page',
    'fields.title': 'Blog',
  });

  const posts = await getAllEntries({
    content_type: 'post',
    order: '-fields.date',
    limit: 1000, // 1000 is the max,
    'fields.draft': false,
    'fields.category[in]': params.category,
  });

  return {
    props: {
      page: pages.items[0] || {},
      posts: {
        ...posts,
        /* eslint-disable no-unused-vars */
        items: posts.items.map(({ thumbnail, images, ...fields }) => ({
          thumbnail: parseItem(thumbnail || {}),
          ...fields,
        })),
      },
    },
  };
};

export const getStaticPaths = async () => {
  const { getCategoriesPaths } = await import('contentClient');

  const paths = await getCategoriesPaths();

  return {
    paths,
    fallback: false,
  };
};

export default CategoryIndex;
