import React from 'react';
import PropTypes from 'prop-types';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Link from 'next/link';
import BaseImage from 'components/image/image';
import { getEntries, getPostsPaths, parseItem } from 'contentClient';
import Gallery from 'components/gallery';
import Layout from 'components/layout';
import Box from 'components/box';
import Head from 'components/head';

const calculateRowHeight = (imageCount) => {
  let multiplier = 3;
  if (typeof window !== 'undefined') {
    multiplier = window.innerWidth > 450 ? 4 : 8;
  }
  const height = 300 * (1 - (multiplier * imageCount) / 100);
  return height > 100 ? height : 100;
};

const hasDivChild = (children) => {
  for (let i = 0; i < children.length; i += 1) {
    if (children[i].type === 'div') {
      return true;
    }
  }
};

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { description, file, title } = node.data.target.fields;

      if (file.contentType.includes('image')) {
        const src = `https:${file.url}`;
        const { width, height } = file.details.image;
        if (description && description.startsWith('http')) {
          return (
            <Link href={description}>
              <a>
                <BaseImage
                  src={src}
                  width={width}
                  height={height}
                  alt={title}
                />
              </a>
            </Link>
          );
        }
        return (
          <BaseImage src={src} width={width} height={height} alt={title} />
        );
      }
    },
    [BLOCKS.PARAGRAPH]: (node, children) => {
      if (hasDivChild(children)) {
        return <span>{children}</span>;
      } else {
        return <p>{children}</p>;
      }
    },
    [INLINES.HYPERLINK]: (node) => {
      if (
        node.data.uri.includes('youtube.com/embed') ||
        node.data.uri.includes('youtube-nocookie.com/embed')
      ) {
        return (
          <div className="youtube-container">
            <iframe
              title={node.content[0].value}
              className="youtube-video"
              src={node.data.uri}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        );
      } else {
        return (
          <Link href={node.data.uri}>
            <a>{node.content[0].value}</a>
          </Link>
        );
      }
    },
  },
};

const Post = ({ post }) => {
  const { images, thumbnail, targetRowHeight } = post;
  const imageUrl = thumbnail ? thumbnail.src : null;

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
        {documentToReactComponents(post.content, options)}
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
    thumbnail: PropTypes.object,
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    targetRowHeight: PropTypes.number.isRequired,
  }).isRequired,
};

export const getStaticProps = async ({ params }) => {
  const posts = await getEntries({
    content_type: 'post',
    'fields.path': params.path,
  });
  const post = posts.items[0] || {};
  const targetRowHeight = post.images
    ? calculateRowHeight(post.images.length)
    : 250;

  return {
    props: {
      post: {
        ...post,
        thumbnail: post.thumbnail ? parseItem(post.thumbnail) : null,
        images: post.images ? post.images.map(parseItem) : [],
        targetRowHeight,
      },
    },
  };
};

export const getStaticPaths = async () => {
  const paths = await getPostsPaths();

  return {
    paths,
    fallback: false,
  };
};

export default Post;
