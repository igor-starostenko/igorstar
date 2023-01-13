import Category from 'components/category';

const Index = ({ page, posts }) => <Category page={page} posts={posts} />;

export default Index;

export const getStaticProps = async () => {
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
    limit: 1000, // 1000 is the max
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
