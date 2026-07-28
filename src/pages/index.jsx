import Category from 'components/category/category.jsx';

const Index = ({ page, posts }) => <Category page={page} posts={posts} />;

export default Index;

// Pagination settings
const POSTS_PER_PAGE = 20;

// Generate paths for all pages statically
export const getStaticPaths = async () => {
  const { getEntries } = await import('contentClient');
  const pages = await getEntries({
    content_type: 'page',
    'fields.title': 'Blog',
  });

  if (!pages.items.length) {
    return { paths: [], fallback: false };
  }

  // Get total post count for this page
  const posts = await getEntries({
    content_type: 'post',
    order: '-fields.date',
  });

  const totalPages = Math.ceil(posts.total / POSTS_PER_PAGE);
  const paths = [];

  // Generate path for page 1 (root /)
  paths.push({ params: {} });

  // Generate paths for subsequent pages (/page/2, /page/3, etc.)
  for (let i = 2; i <= totalPages; i++) {
    paths.push({ params: { page: i.toString() } });
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { getEntries, parseItem } = await import('contentClient');
  const { addBlurDataURLs } = await import('helpers/contentful');

  const pageNum = parseInt(params?.page) || 1;
  const skip = (pageNum - 1) * POSTS_PER_PAGE;

  const pages = await getEntries({
    content_type: 'page',
    'fields.title': 'Blog',
  });

  const posts = await getEntries({
    content_type: 'post',
    order: '-fields.date',
    limit: POSTS_PER_PAGE,
    skip,
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
