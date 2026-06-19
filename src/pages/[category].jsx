import Category from 'components/category/category.jsx';

const CategoryIndex = ({ page, posts }) => (
  <Category page={page} posts={posts} />
);

export const getStaticProps = async ({ params }) => {
  const { getEntries, getAllEntries, parseItem } =
    await import('contentClient');

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

  // Generate blurDataURL for thumbnails during static generation
  const { makeBlurDataURL } = await import('helpers/contentful');
  const thumbUrls = posts.items
    .map((post) => post.thumbnail?.src)
    .filter(Boolean);
  const blurDataUrls = {};
  for (const url of thumbUrls) {
    if (!blurDataUrls[url]) {
      blurDataUrls[url] = (await makeBlurDataURL(url)) ?? null;
    }
  }

  return {
    props: {
      page: pages.items[0] || {},
      posts: {
        ...posts,

        items: posts.items.map(({ thumbnail, images: _images, ...fields }) => ({
          thumbnail: thumbnail
            ? {
                ...parseItem(thumbnail || {}),
                blurDataURL:
                  thumbnail.src && blurDataUrls[thumbnail.src] !== undefined
                    ? blurDataUrls[thumbnail.src]
                    : null,
              }
            : null,
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
