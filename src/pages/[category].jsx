import Category from 'components/category/category.jsx';
import PropTypes from 'prop-types';

const CategoryIndex = ({ page, posts }) => (
  <Category page={page} posts={posts} />
);

const suggestedPostProps = [
  'id',
  'title',
  'path',
  'date',
  'category',
  'tags',
  'description',
  'linkText',
  'thumbnail',
];

const filterObject = (object, props) => {
  if (!Array.isArray(props)) {
    return {};
  }

  return props
    .filter((property) => property in object)
    .map((property) => ({ [property]: object[property] }))
    .reduce((accumulator, current) => ({ ...accumulator, ...current }), {});
};

CategoryIndex.propTypes = {
  page: PropTypes.shape({
    id: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    title: PropTypes.string.isRequired,
  }).isRequired,
  posts: PropTypes.shape({
    total: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        thumbnail: PropTypes.shape({
          src: PropTypes.string.isRequired,
          alt: PropTypes.string.isRequired,
          width: PropTypes.number.isRequired,
          height: PropTypes.number.isRequired,
          blurDataURL: PropTypes.string,
        }),
        tags: PropTypes.arrayOf(PropTypes.string),
        linkText: PropTypes.string,
      }).isRequired
    ).isRequired,
  }).isRequired,
};

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
    limit: 1000,
    'fields.draft': false,
    'fields.category[in]': params.category,
  });

  // Parse posts with necessary props only
  const parsedPosts = {
    ...posts,
    items: posts.items.map(({ thumbnail, images: _images, ...fields }) => ({
      id: fields.id,
      title: fields.title,
      path: fields.path,
      date: fields.date,
      category: fields.category,
      tags: fields.tags,
      description: fields.description,
      linkText: fields.linkText,
      thumbnail: thumbnail ? parseItem(thumbnail) : null,
    })),
  };

  // Add blurDataURLs to thumbnails
  const _postsWithBlurData = await addBlurDataURLs(parsedPosts.items, {
    path: 'thumbnail',
  });

  // Parse gallery images for posts
  const finalPosts = await addBlurDataURLs(
    parsedPosts.items.map((post) => ({
      ...filterObject(post, suggestedPostProps),
      images: post.images
        ? post.images.map((img) => parseItem(img))
        : [],
    })),
    { path: 'images' }
  );

  return {
    props: {
      page: pages.items[0] || {},
      posts: {
        ...posts,
        items: finalPosts,
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
