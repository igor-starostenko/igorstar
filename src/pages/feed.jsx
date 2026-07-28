import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import Layout from 'components/layout/layout.jsx';
import Box from 'components/box/box.jsx';
import Head from 'components/head/head.jsx';
import Title from 'components/title/title.jsx';
import Gallery from 'components/gallery/gallery.jsx';
import { useInfiniteScroll } from 'hooks/useInfiniteScroll.jsx';
import InfiniteScroll from 'components/infinite-scroll/InfiniteScroll.jsx';

const _Pagination = dynamic(
  () => import('components/pagination/pagination.jsx')
);

const formatCaption = ({ description, locationText, date }) => {
  const day = date ? new Date(date).toDateString() : null;
  const locationPrefix = description && locationText ? ' - ' : '';
  const dayPrefix = (description || locationText) && day ? ', ' : '';
  return `${description}${locationPrefix}${locationText}${dayPrefix}${day}`;
};

const FeedPage = ({ page, feed }) => {
  const pageSize = 20;

  const { items: displayImages, loadMore } = useInfiniteScroll(
    feed.images,
    pageSize
  );

  return (
    <Layout>
      <Head pageTitle={page.title} />
      <Box>
        <Title as="h1" size="large">
          {page.title}
        </Title>
        <InfiniteScroll
          hasMore={displayImages.length < feed.images.length}
          isLoading={false}
          loadMore={loadMore}
        >
          {displayImages.length > 0 && (
            <Gallery photos={displayImages} targetRowHeight={250} />
          )}
        </InfiniteScroll>
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
  }).isRequired,
};

export const getStaticProps = async () => {
  const { getEntries, getAllEntries, parseItem } =
    await import('contentClient');
  const { addBlurDataURLs } = await import('helpers/contentful');

  const pages = await getEntries({
    content_type: 'page',
    'fields.title': 'Photo Feed',
  });

  const { items, ...feed } = await getAllEntries({
    content_type: 'feed',
    order: '-fields.date',
    limit: 1000,
  });

  // Parse images with caption and add blurDataURLs if not already set
  const parsedImages = items
    ? items.map(({ image, description, locationText, date, ...fields }) => ({
        caption: formatCaption({ description, locationText, date }),
        ...fields,
        ...parseItem(image),
      }))
    : [];

  const imagesWithBlurData = await addBlurDataURLs(parsedImages);

  return {
    props: {
      page: pages.items[0] || {},
      feed: {
        ...feed,
        images: imagesWithBlurData,
      },
    },
  };
};

export default FeedPage;
