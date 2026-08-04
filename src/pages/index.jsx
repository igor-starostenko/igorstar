import Category from 'components/category/category.jsx';

const Index = ({ title, posts }) => <Category title={title} posts={posts} />;

export default Index;

export const getStaticProps = async () => {
  const { getEntries, getAllEntries, parseItem } =
    await import('contentClient');
  const { filterObject, addBlurDataURLs } = await import('helpers/contentful');

  const pages = await getEntries({
    content_type: 'page',
    'fields.title': 'Blog',
  });
  const page = pages.items?.[0];
  if (!page) return { notFound: true };
  const { title } = page;

  const posts = await getAllEntries({
    content_type: 'post',
    order: '-fields.date',
    limit: 1000, // 1000 is the max
  });

  // Strip fields not needed on listing page to reduce __NEXT_DATA__ size
  const parsedPosts = {
    ...posts,
    items: posts.items.map((post) => ({
      ...filterObject(post, [
        'id',
        'title',
        'path',
        'date',
        'category',
        'tags',
        'description',
        'linkText',
      ]),
      thumbnail: post.thumbnail ? parseItem(post.thumbnail) : null,
    })),
  };

  // Add blurDataURLs for blur-up placeholders
  const postsWithBlurData = await addBlurDataURLs(parsedPosts.items, {
    path: 'thumbnail',
  });

  return {
    props: {
      title,
      posts: {
        ...parsedPosts,
        items: postsWithBlurData,
      },
    },
  };
};