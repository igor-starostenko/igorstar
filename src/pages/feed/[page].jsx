import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import Layout from 'components/layout/layout.jsx';
import Box from 'components/box/box.jsx';
import Head from 'components/head/head.jsx';
import Title from 'components/title/title.jsx';
import Gallery from 'components/gallery/gallery.jsx';
import { ContentDetails } from 'components/layout/layout.css.js';

const Pagination = dynamic(
  () => import('components/pagination/pagination.jsx')
);

const formatCaption = ({ description, locationText, date }) => {
  const day = date ? new Date(date).toDateString() : null;
  const locationPrefix = description && locationText ? ' - ' : '';
  const dayPrefix = (description || locationText) && day ? ', ' : '';
  return `${description}${locationPrefix}${locationText}${dayPrefix}${day}`;
};

const FeedPage = ({ page, feed }) => {
  const pageNum = parseInt(page.params?.page) || 1;
  const pageSize = 12;

  // Calculate which images to show on this page
  const startIndex = (pageNum - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, feed.total);
  const currentImages = feed.images.slice(startIndex, endIndex);

  return (
    <Layout>
      <Head pageTitle={page.title} />
      <Box>
        <ContentDetails>
          <Title as="h1" size="large">
            {page.title}
          </Title>
        </ContentDetails>
        <div>
          {currentImages.length > 0 && (
            <Gallery photos={currentImages} targetRowHeight={250} />
          )}
        </div>
        <Pagination pageNum={pageNum} totalPages={Math.ceil(feed.total / pageSize)} />
      </Box>
    </Layout>
  );
};

FeedPage.propTypes = {
  page: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  feed: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
};

// Generate paths for all pages statically (page 1 is /feed, page 2+ are /feed/page/N)
export const getStaticPaths = async () => {
  const { getEntries } = await import('contentClient');

  const pages = await getEntries({
    content_type: 'page',
    'fields.title': 'Photo Feed',
  });

  if (!pages.items.length) {
    return { paths: [], fallback: false };
  }

  const feed = await getEntries({
    content_type: 'feed',
    order: '-fields.date',
  });

  const totalPages = Math.ceil(feed.total / 12);
  const paths = [];

  // Generate path for page 1 (root /feed)
  paths.push({ params: { page: '1' } });

  // Generate paths for subsequent pages (/feed/page/2, etc.)
  for (let i = 2; i <= totalPages; i++) {
    paths.push({ params: { page: i.toString() } });
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { getEntries, parseItem } = await import('contentClient');
  const { addBlurDataURLs } = await import('helpers/contentful');

  const _pageNum = parseInt(params?.page) || 1;

  const pages = await getEntries({
    content_type: 'page',
    'fields.title': 'Photo Feed',
  });

  // Fetch all feed images at build time, but only show pageSize on each page
  const allFeedData = await getEntries({
    content_type: 'feed',
    order: '-fields.date',
  });

  // Parse all images with caption and add blurDataURLs if not already set
  const parsedImages = allFeedData.items
    ? allFeedData.items.map(({ image, description, locationText, date, ...fields }) => ({
        caption: formatCaption({ description, locationText, date }),
        ...fields,
        ...parseItem(image),
      }))
    : [];

  const imagesWithBlurData = await addBlurDataURLs(parsedImages);

  return {
    props: {
      page: {
        ...pages.items[0],
      },
      feed: {
        images: imagesWithBlurData,
        total: allFeedData.total,
      },
    },
  };
};

export default FeedPage;
