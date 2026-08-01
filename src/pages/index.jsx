import Category from 'components/category/category.jsx';

const Index = ({ title, posts }) => <Category title={title} posts={posts} />;

export default Index;

export const getStaticProps = async () => {
  const { getEntries, getAllEntries, parseItem } =
    await import('contentClient');
  const { addBlurDataURLs } = await import('helpers/contentful');

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

  // Parse posts and add blurDataURLs to nested thumbnail images
  const parsedPosts = {
    ...posts,
    items: posts.items.map(({ thumbnail, images: _images, ...fields }) => ({
      thumbnail: thumbnail ? parseItem(thumbnail) : null,
      ...fields,
    })),
  };

  // Add blurDataURLs to thumbnail.images in posts array
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
