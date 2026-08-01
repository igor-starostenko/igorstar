import Category from 'components/category/category.jsx';
import PropTypes from 'prop-types';

const CategoryIndex = ({ title, posts }) => (
  <Category title={title} posts={posts} />
);

CategoryIndex.propTypes = {
  title: PropTypes.string.isRequired,
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
    limit: 1000,
    'fields.draft': false,
    'fields.category[in]': params.category,
  });

  const finalPosts = await addBlurDataURLs(
    posts.items.map((post) => ({
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
    { path: 'thumbnail' }
  );

  return {
    props: {
      title,
      posts: {
        total: posts.total,
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
