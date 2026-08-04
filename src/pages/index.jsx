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

  // Strip heavy fields (content, recommendations, images, layout, draft, etc.)
  // that are only needed on individual post pages, not on the listing page.
  // This reduces __NEXT_DATA__ from ~151KB to ~52KB by removing the full
  // rich text content bodies which are never used by the Article component.
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

  // Add blurDataURLs to thumbnail images for the blur-up placeholder effect
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