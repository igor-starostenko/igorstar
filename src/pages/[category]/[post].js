import React from 'react';
import PropTypes from 'prop-types';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import SyntaxHighlighter from 'react-syntax-highlighter';
import Link from 'next/link';
import { colors } from 'constants/theme';
import BaseImage from 'components/image/image';
import { getAllEntries, getPostsPaths, parseItem } from 'contentClient';
import Gallery from 'components/gallery';
import Layout from 'components/layout';
import Box from 'components/box';
import Head from 'components/head';
import Recommendations from 'components/recommendations';

const calculateRowHeight = (imageCount) => {
  let multiplier = 3;
  if (typeof window !== 'undefined') {
    multiplier = window.innerWidth > 450 ? 4 : 8;
  }
  const height = 300 * (1 - (multiplier * imageCount) / 100);
  return height > 100 ? height : 100;
};

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

const hasDivChild = (children) => {
  for (let i = 0; i < children.length; i += 1) {
    if (children[i].type === 'div') {
      return true;
    }
  }
};

const hasMultilineCode = (node) => {
  return (
    node.content.filter(
      (content) =>
        content.marks &&
        content.value.includes('\n') &&
        content.marks.filter(({ type }) => type === 'code').length > 0
    ).length > 0
  );
};

const options = {
  renderMark: {
    [MARKS.CODE]: (text) => {
      const isMultiline = text.includes('\n');
      if (!isMultiline) {
        return (
          <code
            style={{
              background: colors.lightestGrey,
              padding: '5px',
              borderRadius: '5px',
            }}
          >
            {text}
          </code>
        );
      }

      return (
        <SyntaxHighlighter showLineNumbers={isMultiline}>
          {text}
        </SyntaxHighlighter>
      );
    },
  },
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const {
        sys: { id },
        fields: { description, file, title },
      } = node.data.target;
      const { width, height } = file.details.image;
      const imageProps = {
        src: `/images/${id}_${file.fileName}`,
        backupSrc: `https:${file.url}`,
        alt: title,
        width,
        height,
      };

      if (file.contentType.includes('image')) {
        if (description && description.startsWith('http')) {
          return (
            <Link href={description}>
              <BaseImage {...imageProps} />
            </Link>
          );
        }
        return <BaseImage {...imageProps} />;
      }
    },
    [BLOCKS.PARAGRAPH]: (node, children) => {
      if (hasDivChild(children)) {
        return <span>{children}</span>;
      } else if (hasMultilineCode(node)) {
        return <div>{children}</div>;
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
        return <Link href={node.data.uri}>{node.content[0].value}</Link>;
      }
    },
  },
};

const Post = ({ post, recommendations }) => {
  const { images, thumbnail, targetRowHeight } = post;
  const imageUrl = thumbnail ? thumbnail.src : null;

  return (
    <Layout>
      <Head pageTitle={post.title} imageUrl={imageUrl} />
      <Box>
        <div
          style={{
            color: colors.grey,
            margin: '1rem 0rem 2rem 0rem',
          }}
        >
          <span>
            Category: <Link href={`/${post.category}`}>{post.category}</Link>
          </span>
        </div>
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
        <Recommendations category={post.category} posts={recommendations} />
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
    linkText: PropTypes.string,
    content: PropTypes.object.isRequired,
    thumbnail: PropTypes.object,
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    targetRowHeight: PropTypes.number.isRequired,
  }).isRequired,
  recommendations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string),
      description: PropTypes.string.isRequired,
      linkText: PropTypes.string,
      thumbnail: PropTypes.object,
    })
  ),
};

export const getStaticProps = async ({ params }) => {
  const posts = await getAllEntries({
    content_type: 'post',
    limit: 100, // 1000 is the max,
    'fields.draft': false,
    'fields.category': params.category,
    // 'fields.path': params.post,
    order: '-fields.date',
  });

  const postIndex = posts.items.findIndex((post) => post.path === params.post);
  const nextPostIndex = postIndex === 0 ? postIndex + 2 : postIndex - 1;
  const previousPostIndex =
    postIndex === posts.total - 1 ? postIndex - 2 : postIndex + 1;
  const post = posts.items[postIndex] || {};
  const recommendedPosts = (
    post.recommendations && post.recommendations.length > 0
      ? post.recommendations.map((path) =>
          posts.items.find((post) => post.path === path)
        )
      : [posts.items[nextPostIndex] || {}, posts.items[previousPostIndex] || {}]
  ).filter((post) => post !== undefined && post !== null);

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
      recommendations: recommendedPosts.map((post) => ({
        ...filterObject(post, suggestedPostProps),
        thumbnail: post.thumbnail ? parseItem(post.thumbnail) : null,
      })),
    },
  };
};

export const getStaticPaths = async () => {
  const paths = await getPostsPaths({
    'fields.draft': false,
  });

  return {
    paths,
    fallback: false,
  };
};

export default Post;
