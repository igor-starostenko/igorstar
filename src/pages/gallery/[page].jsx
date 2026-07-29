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

const GalleryPage = ({ params, page, gallery }) => {
  const pageNum = parseInt(params.page) || 1;
  const pageSize = 10;

  // Calculate which images to show on this page
  const startIndex = (pageNum - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, gallery.total);
  const currentImages = gallery.images.slice(startIndex, endIndex);

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
        <Pagination pageNum={pageNum} totalPages={Math.ceil(gallery.total / pageSize)} basePath="gallery" />
      </Box>
    </Layout>
  );
};

GalleryPage.propTypes = {
  params: PropTypes.shape({
    page: PropTypes.string,
  }).isRequired,
  page: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  gallery: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
};

// Generate paths for all pages statically (page 1 is /gallery, page 2+ are /gallery/page/N)
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

  const totalPages = Math.ceil(gallery.total / 10);
  const paths = [];

  // Generate path for page 1 (root /gallery)
  paths.push({ params: { page: '1' } });

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

  const _pageNum = parseInt(params?.page) || 1;

  const pages = await getEntries({
    content_type: 'page',
    'fields.title': 'Gallery',
  });

  // Fetch all gallery images at build time, but only show pageSize on each page
  const allGalleryData = await getEntries({
    content_type: 'gallery',
  });

  // Parse all images and add blurDataURLs if not already set
  const parsedImages = allGalleryData.items
    ? allGalleryData.items.map(({ image, ...fields }) => ({
        ...parseItem(image),
        ...fields,
      }))
    : [];

  const imagesWithBlurData = await addBlurDataURLs(parsedImages);

  return {
    props: {
      params,
      page: {
        ...pages.items[0],
      },
      gallery: {
        images: imagesWithBlurData,
        total: allGalleryData.total,
      },
    },
  };
};

export default GalleryPage;
