import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Link from 'next/link';
import { colors } from 'constants/theme.js';
import { CategoryLabel, ContentDetails } from 'components/layout/layout.css.js';
import Gallery from 'components/gallery/gallery.jsx';
import Layout from 'components/layout/layout.jsx';
import Box from 'components/box/box.jsx';
import Head from 'components/head/head.jsx';
import Recommendations from 'components/recommendations/recommendations.jsx';

const DateText = dynamic(() => import('components/date/date.jsx'), {
  ssr: false,
});

const calculateRowHeight = (imageCount) => {
  let multiplier = 3;
  if (typeof window !== 'undefined') {
    multiplier = window.innerWidth > 450 ? 4 : 8;
  }
  const height = 300 * (1 - (multiplier * imageCount) / 100);
  return height > 100 ? height : 100;
};

const _suggestedPostProps = [
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

const _filterObject = (object, props) => {
  if (!Array.isArray(props)) {
    return {};
  }

  return props
    .filter((property) => property in object)
    .map((property) => ({ [property]: object[property] }))
    .reduce((accumulator, current) => ({ ...accumulator, ...current }), {});
};

const Post = ({ post, recommendations }) => {
  const { images, thumbnail } = post;
  const imageUrl = thumbnail ? thumbnail.src : null;

  return (
    <Layout>
      <Head pageTitle={post.title} imageUrl={imageUrl} />
      <Box>
        <CategoryLabel
          style={{
            color: colors.grey,
          }}
        >
          <span>
            Category: <Link href={`/${post.category}`}>{post.category}</Link>
          </span>
        </CategoryLabel>
        {images.length > 0 && (
          <Gallery
            key={post.path}
            photos={images}
            order="asc"
            targetRowHeight={post.targetRowHeight}
          />
        )}
        <ContentDetails>
          <h1>{post.title}</h1>
          <div style={{ display: 'inline-flex' }}>
            <DateText date={post.date} />
          </div>
          {documentToReactComponents(post.content)}
          <Recommendations category={post.category} posts={recommendations} />
        </ContentDetails>
      </Box>
    </Layout>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired,
    thumbnail: PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      blurDataURL: PropTypes.string,
    }),
    images: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string,
        blurDataURL: PropTypes.string,
      })
    ).isRequired,
    targetRowHeight: PropTypes.number.isRequired,
  }).isRequired,
  recommendations: PropTypes.arrayOf(
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
    })
  ),
};

export const getStaticProps = async ({ params }) => {
  const { getAllEntries, parseItem } = await import('contentClient');
  const { addBlurDataURLs } = await import('helpers/contentful');

  const posts = await getAllEntries({
    content_type: 'post',
    limit: 100,
    'fields.draft': false,
    'fields.category': params.category,
    order: '-fields.date',
  });

  const postIndex = posts.items.findIndex((post) => post.path === params.post);
  const nextPostIndex = postIndex === 0 ? postIndex + 2 : postIndex - 1;
  const previousPostIndex =
    postIndex === posts.total - 1 ? postIndex - 2 : postIndex + 1;
  const originalPost = posts.items[postIndex] || {};
  const recommendedPosts = (
    originalPost.recommendations && originalPost.recommendations.length > 0
      ? originalPost.recommendations.map((path) =>
          posts.items.find((post) => post.path === path)
        )
      : [posts.items[nextPostIndex] || {}, posts.items[previousPostIndex] || {}]
  ).filter((post) => post !== undefined && post !== null);

  const targetRowHeight = originalPost.images
    ? calculateRowHeight(originalPost.images.length)
    : 250;

  // Parse post data with only necessary props
  const parsedPost = {
    id: originalPost.id,
    title: originalPost.title,
    path: originalPost.path,
    date: originalPost.date,
    category: originalPost.category,
    description: originalPost.description,
    content: originalPost.content,
    tags: originalPost.tags,
    linkText: originalPost.linkText,
  };

  // Parse and add blurDataURLs to post thumbnail
  const thumbnailWithBlur = originalPost.thumbnail
    ? ((await addBlurDataURLs([parseItem(originalPost.thumbnail)]))[0] ?? null)
    : null;

  // Parse and add blurDataURLs to post images
  const imagesWithBlur = originalPost.images
    ? await addBlurDataURLs(originalPost.images.map(parseItem))
    : [];

  // Parse recommended posts with only necessary props
  const parsedRecommendations = await addBlurDataURLs(
    recommendedPosts.map((rp) => ({
      id: rp.id,
      title: rp.title,
      path: rp.path,
      date: rp.date,
      category: rp.category,
      description: rp.description,
      thumbnail: rp.thumbnail ? parseItem(rp.thumbnail) : null,
    })),
    { path: 'thumbnail' }
  );

  return {
    props: {
      post: {
        ...parsedPost,
        thumbnail: thumbnailWithBlur,
        images: imagesWithBlur,
        targetRowHeight,
      },
      recommendations: parsedRecommendations,
    },
  };
};

export const getStaticPaths = async () => {
  const { getPostsPaths } = await import('contentClient');

  const paths = await getPostsPaths({
    'fields.draft': false,
  });

  return {
    paths,
    fallback: false,
  };
};

export default Post;
