import Category from 'components/category/category.jsx';

const Index = ({ page, posts }) => <Category page={page} posts={posts} />;

export default Index;

export const getStaticProps = async () => {
  const { getEntries, getAllEntries, parseItem } =
    await import('contentClient');

  const pages = await getEntries({
    content_type: 'page',
    'fields.title': 'Blog',
  });

  const posts = await getAllEntries({
    content_type: 'post',
    order: '-fields.date',
    limit: 1000, // 1000 is the max
  });

  // Pre-generate blurDataURLs for thumbnails during data fetching
  const { makeBlurDataURL } = await import('helpers/contentful');

  const postsWithBlurData = {
    ...posts,
    items: await Promise.all(
      posts.items.map(async ({ thumbnail, images: _images, ...fields }) => {
        const parsedThumbnail = parseItem(thumbnail || {});

        // Generate blurDataURL if thumbnail exists and is from Contentful
        let blurDataURL = undefined;
        if (parsedThumbnail?.src) {
          blurDataURL = await makeBlurDataURL(parsedThumbnail.src);
        }

        // Only include blurDataURL if it has a valid value (Next.js requires serializable JSON)
        const thumbnailWithBlur = { ...parsedThumbnail };
        if (blurDataURL) {
          thumbnailWithBlur.blurDataURL = blurDataURL;
        }

        return {
          ...fields,
          thumbnail: thumbnailWithBlur,
        };
      })
    ),
  };

  return {
    props: {
      page: pages.items[0] || {},
      posts: postsWithBlurData,
    },
  };
};
