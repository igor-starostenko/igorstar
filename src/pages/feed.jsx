import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import Layout from 'components/layout/layout.jsx';
import Box from 'components/box/box.jsx';
import Head from 'components/head/head.jsx';
import Title from 'components/title/title.jsx';
import Gallery from 'components/gallery/gallery.jsx';

const Pagination = dynamic(
  () => import('components/pagination/pagination.jsx')
);

// Pagination settings
const IMAGES_PER_PAGE = 20;

const formatCaption = ({ description, locationText, date }) => {
  const day = date ? new Date(date).toDateString() : null;
  const locationPrefix = description && locationText ? ' - ' : '';
  const dayPrefix = (description || locationText) && day ? ', ' : '';
  return `${description}${locationPrefix}${locationText}${dayPrefix}${day}`;
};

const FeedPage = ({ page, feed }) => {
  const pageNum = parseInt(page.pageNum) || 1;
  const startIndex = (pageNum - 1) * IMAGES_PER_PAGE;
  const endIndex = startIndex + IMAGES_PER_PAGE;
  const currentImages = feed.images.slice(startIndex, endIndex);
  const totalPages = Math.ceil(feed.total / IMAGES_PER_PAGE);

  return (
    <Layout>
      <Head pageTitle={page.title} />
      <Box>
        <Title as="h1" size="large">
          {page.title}
        </Title>
        {currentImages.length > 0 && (
          <Gallery photos={currentImages} targetRowHeight={250} />
        )}
        <Pagination pageNum={pageNum} totalPages={totalPages} />
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

export default FeedPage;

// Generate paths for all pages statically
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

  const totalPages = Math.ceil(feed.total / IMAGES_PER_PAGE);
  const paths = [];

  // Generate path for page 1 (root /feed)
  paths.push({ params: {} });

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

  const pageNum = parseInt(params?.page) || 1;
  const skip = (pageNum - 1) * IMAGES_PER_PAGE;

  const pages = await getEntries({
    content_type: 'page',
    'fields.title': 'Photo Feed',
  });

  const feedData = await getEntries({
    content_type: 'feed',
    order: '-fields.date',
    limit: IMAGES_PER_PAGE,
    skip,
  });

  // Parse images with caption and add blurDataURLs if not already set
  const parsedImages = feedData.items
    ? feedData.items.map(
        ({ image, description, locationText, date, ...fields }) => ({
          caption: formatCaption({ description, locationText, date }),
          ...fields,
          ...parseItem(image),
        })
      )
    : [];

  const imagesWithBlurData = await addBlurDataURLs(parsedImages);

  return {
    props: {
      page: pages.items[0] || {},
      feed: {
        images: imagesWithBlurData,
        total: feedData.total,
      },
      pageNum,
    },
  };
};
