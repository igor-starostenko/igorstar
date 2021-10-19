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
  const { images, thumbnail } = post;

  return (
    <Layout>
      <Head pageTitle={post.title} imageUrl={`https:${thumbnail.file.url}`} />
      <Box>
        <div style={{ margin: '0 -4rem' }}>
          {images.length > 0 && (
            <Gallery
              photos={images}
              order="asc"
              targetRowHeight={calculateRowHeight(images.length)}
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
  }).isRequired,
};

export const getStaticProps = async ({ params }) => {
  const posts = await getEntries({
    content_type: 'post',
    'fields.path': params.path,
  });
  const post = posts.items[0];

  return {
    props: {
      post: {
        ...post,
        thumbnail: post.thumbnail ? parseFields(post.thumbnail) : { file: {} },
        images: post.images ? post.images.map(parseFields) : [],
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
