import React from 'react';
import PropTypes from 'prop-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getEntries, parseFields } from 'contentClient';
import Gallery from 'components/gallery';
import Layout from 'components/layout';
import Box from 'components/box';
import Head from 'components/head';

const calculateRowHeight = imageCount => {
  let multiplier = 3;
  if (typeof window !== 'undefined') {
    multiplier = window.innerWidth > 450 ? 4 : 8;
  }
  const height = 300 * (1 - (multiplier * imageCount) / 100);
  return height > 100 ? height : 100;
};

const Post = ({ post }) => {
  const { images, thumbnail, targetRowHeight } = post;
  const imageUrl = thumbnail ? `https:${thumbnail.file.url}` : null;

  return (
    <Layout>
      <Head pageTitle={post.title} imageUrl={imageUrl} />
      <Box>
        <div style={{ margin: '0 -4rem' }}>
          {images.length > 0 && (
            <Gallery
              photos={images}
              order="asc"
              targetRowHeight={targetRowHeight}
            />
          )}
        </div>
        <h1>{post.title}</h1>
        {documentToReactComponents(post.content)}
      </Box>
    </Layout>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    layout: PropTypes.string.isRequired,
    draft: PropTypes.bool.isRequired,
    category: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired,
    thumbnail: PropTypes.object.isRequired,
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    targetRowHeight: PropTypes.number.isRequired,
  }).isRequired,
};

export const getStaticProps = async ({ params }) => {
  const posts = await getEntries({
    content_type: 'post',
    'fields.path': params.path,
  });
  const post = posts.items[0];
  const targetRowHeight = post.images
    ? calculateRowHeight(post.images.length)
    : 250;

  return {
    props: {
      post: {
        ...post,
        thumbnail: post.thumbnail ? parseFields(post.thumbnail) : null,
        images: post.images
          ? post.images.map(data => {
              const { file, ...fields } = parseFields(data);
              const { width, height } = file.details.image;
              return {
                ...fields,
                src: `https:${file.url}`,
                width,
                height,
              };
            })
          : [],
        targetRowHeight,
      },
    },
  };
};

export const getStaticPaths = async () => {
  const posts = await getEntries({ content_type: 'post' });

  return {
    paths: posts.items.map(({ path }) => ({ params: { path } })),
    fallback: false,
  };
};

export default Post;
