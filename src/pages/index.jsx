import Category from 'components/category/category.jsx';

const Index = ({ page, posts }) => <Category page={page} posts={posts} />;

export default Index;

export const getStaticProps = async () => {
  const { getEntries, getAllEntries, parseItem } =
    await import('contentClient');
  const { addBlurDataURLs } = await import('helpers/contentful');

  const pages = await getEntries({
    content_type: 'page',
    'fields.title': 'Blog',
  });

  const posts = await getAllEntries({
    content_type: 'post',
    order: '-fields.date',
    limit: 20,
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
      page: pages.items[0] || {},
      posts: {
        ...parsedPosts,
        items: postsWithBlurData,
      },
    },
  };
};
