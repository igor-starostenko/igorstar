import PropTypes from 'prop-types';
import Layout from 'components/layout/layout.jsx';
import Box from 'components/box/box.jsx';
import Gallery from 'components/gallery/gallery.jsx';
import Head from 'components/head/head.jsx';
import Title from 'components/title/title.jsx';
import { ContentDetails } from 'components/layout/layout.css.js';

const GalleryPage = ({ page, gallery }) => (
  <Layout>
    <Head pageTitle={page.title} />
    <Box>
      <ContentDetails>
        <Title as="h1" size="large">
          {page.title}
        </Title>
      </ContentDetails>
      {gallery.images.length > 0 && (
        <Gallery photos={gallery.images} targetRowHeight={250} />
      )}
    </Box>
  </Layout>
);

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
