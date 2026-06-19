import Category from 'components/category/category.jsx';

const CategoryIndex = ({ page, posts }) => (
  <Category page={page} posts={posts} />
);

export const getStaticProps = async ({ params }) => {
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
    limit: 1000, // 1000 is the max,
    'fields.draft': false,
    'fields.category[in]': params.category,
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

export const getStaticPaths = async () => {
  const { getCategoriesPaths } = await import('contentClient');

  const paths = await getCategoriesPaths();

  return {
    paths,
    fallback: false,
  };
};

export default CategoryIndex;
