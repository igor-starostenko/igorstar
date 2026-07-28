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

const GalleryPage = ({ page, gallery }) => {
  const pageSize = 20;

  const { items: displayImages, loadMore } = useInfiniteScroll(
    gallery.images,
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
          hasMore={displayImages.length < gallery.images.length}
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

GalleryPage.propTypes = {
  page: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  gallery: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default GalleryPage;

export const getStaticProps = async () => {
  const { getEntries, getAllEntries, parseItem } =
    await import('contentClient');
  const { addBlurDataURLs } = await import('helpers/contentful');

  const pages = await getEntries({
    content_type: 'page',
    'fields.title': 'Gallery',
  });

  const { items, ...gallery } = await getAllEntries({
    content_type: 'gallery',
  });

  // Parse images and add blurDataURLs if not already set
  const parsedImages = items
    ? items.map(({ image, ...fields }) => ({
        ...parseItem(image),
        ...fields,
      }))
    : [];

  const imagesWithBlurData = await addBlurDataURLs(parsedImages);

  return {
    props: {
      page: pages.items[0] || {},
      gallery: {
        ...gallery,
        images: imagesWithBlurData,
      },
    },
  };
};
