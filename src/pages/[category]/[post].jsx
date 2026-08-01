import dynamic from 'next/dynamic';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Link from 'next/link';
import PropTypes from 'prop-types';
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

const SyntaxHighlighter = dynamic(() => import('react-syntax-highlighter'), {
  ssr: false,
});

const FlickrImage = dynamic(() => import('components/image/flickrImage.jsx'));

const BaseImage = dynamic(() => import('components/image/baseImage.jsx'));

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

const isFlickrEmbed = ({ data }) => {
  return (
    data.uri.includes('data-flickr-embed') ||
    data.uri.includes('class="flickr-embed"')
  );
};

const isFlickrNode = (node) => {
  const links = node.content.filter(({ nodeType }) => nodeType === 'hyperlink');

  return links.filter(isFlickrEmbed).length > 0;
};

const decodeUri = (uri) => {
  try {
    return uri
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"');
  } catch {
    return uri;
  }
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
        style: { paddingTop: '2rem' },
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
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      const { uri } = node.data.target.fields || {};
      if (uri && uri.includes('data-flickr-embed')) {
        return <FlickrImage xml={uri} />;
      }
    },
    [BLOCKS.PARAGRAPH]: (node, children) => {
      if (hasDivChild(children)) {
        return <span>{children}</span>;
      } else if (hasMultilineCode(node)) {
        return <div>{children}</div>;
      } else if (isFlickrNode(node)) {
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
      } else if (isFlickrEmbed(node)) {
        const xml = decodeUri(node.data.uri);
        return <FlickrImage xml={xml} />;
      } else {
        return <Link href={node.data.uri}>{node.content[0].value}</Link>;
      }
    },
  },
  renderInlineEntry: (node) => {
    const { uri } = node.data.target.fields || {};
    if (uri && uri.includes('data-flickr-embed')) {
      return <FlickrImage xml={uri} />;
    }

    return null;
  },
};

const filterObject = (object, props) => {
  if (!Array.isArray(props)) {
    return {};
  }

  return props
    .filter((property) => property in object)
    .map((property) => ({ [property]: object[property] }))
    .reduce((accumulator, current) => ({ ...accumulator, ...current }), {});
};

const Post = ({
  title,
  date,
  category,
  path,
  content,
  targetRowHeight,
  images,
  thumbnail,
  recommendations,
}) => {
  const imageUrl = thumbnail ? thumbnail.src : null;

  return (
    <Layout>
      <Head pageTitle={title} imageUrl={imageUrl} />
      <Box>
        <CategoryLabel
          style={{
            color: colors.grey,
          }}
        >
          <span>
            Category: <Link href={`/${category}`}>{category}</Link>
          </span>
        </CategoryLabel>
        {images.length > 0 && (
          <Gallery
            key={path}
            photos={images}
            order="asc"
            targetRowHeight={targetRowHeight}
          />
        )}
        <ContentDetails>
          <h1>{title}</h1>
          <div style={{ display: 'inline-flex' }}>
            <DateText date={date} />
          </div>
          {documentToReactComponents(content, options)}
          <Recommendations category={category} posts={recommendations} />
        </ContentDetails>
      </Box>
    </Layout>
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
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
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      alt: PropTypes.string,
      description: PropTypes.string,
      blurDataURL: PropTypes.string,
    })
  ).isRequired,
  targetRowHeight: PropTypes.number.isRequired,
  recommendations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string),
      description: PropTypes.string.isRequired,
      linkText: PropTypes.string,
      thumbnail: PropTypes.object,
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

  // Parse images and add blurDataURLs if not already set
  const thumbnailWithBlur = originalPost.thumbnail
    ? ((await addBlurDataURLs([parseItem(originalPost.thumbnail)]))[0] ?? null)
    : null;

  const imagesWithBlur = originalPost.images
    ? await addBlurDataURLs(originalPost.images.map(parseItem))
    : [];

  const parsedRecommendations = await addBlurDataURLs(
    recommendedPosts.map((rp) => ({
      ...filterObject(rp, [
        'id',
        'date',
        'title',
        'category',
        'path',
        'tags',
        'description',
        'linkText',
      ]),
      thumbnail: rp.thumbnail ? parseItem(rp.thumbnail) : null,
    })),
    { path: 'thumbnail' }
  );

  return {
    props: {
      ...filterObject(originalPost, [
        'title',
        'date',
        'category',
        'path',
        'content',
      ]),
      targetRowHeight,
      thumbnail: thumbnailWithBlur,
      images: imagesWithBlur,
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
