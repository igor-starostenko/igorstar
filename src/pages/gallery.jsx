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

const GalleryPage = ({ page, gallery }) => {
  const pageNum = parseInt(page.pageNum) || 1;
  const startIndex = (pageNum - 1) * IMAGES_PER_PAGE;
  const endIndex = startIndex + IMAGES_PER_PAGE;
  const currentImages = gallery.images.slice(startIndex, endIndex);
  const totalPages = Math.ceil(gallery.total / IMAGES_PER_PAGE);

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

GalleryPage.propTypes = {
  page: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  gallery: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
};

export default GalleryPage;

// Generate paths for all pages statically
export const getStaticPaths = async () => {
  const { getEntries } = await import('contentClient');

  const pages = await getEntries({
    content_type: 'page',
    'fields.title': 'Gallery',
  });

  if (!pages.items.length) {
    return { paths: [], fallback: false };
  }

  const gallery = await getEntries({
    content_type: 'gallery',
  });

  const totalPages = Math.ceil(gallery.total / IMAGES_PER_PAGE);
  const paths = [];

  // Generate path for page 1 (root /gallery)
  paths.push({ params: {} });

  // Generate paths for subsequent pages (/gallery/page/2, etc.)
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
    'fields.title': 'Gallery',
  });

  const galleryData = await getEntries({
    content_type: 'gallery',
    limit: IMAGES_PER_PAGE,
    skip,
  });

  // Parse images and add blurDataURLs if not already set
  const parsedImages = galleryData.items
    ? galleryData.items.map(({ image, ...fields }) => ({
        ...parseItem(image),
        ...fields,
      }))
    : [];

  const imagesWithBlurData = await addBlurDataURLs(parsedImages);

  return {
    props: {
      page: pages.items[0] || {},
      gallery: {
        images: imagesWithBlurData,
        total: galleryData.total,
      },
      pageNum,
    },
  };
};
