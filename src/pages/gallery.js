import PropTypes from 'prop-types';
import Layout from 'components/layout';
import Box from 'components/box';
import Gallery from 'components/gallery';
import Head from 'components/head';
import Title from 'components/title';

const GalleryPage = ({ page, gallery }) => (
  <Layout>
    <Head pageTitle={page.title} />
    <Box>
      <Title as="h1" size="large">
        {page.title}
      </Title>
      <div style={{ margin: '0 -4rem' }}>
        {gallery.images.length > 0 && (
          <Gallery photos={gallery.images} targetRowHeight={250} />
        )}
      </div>
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
  const { getEntries, getAllEntries, parseItem } = await import(
    'contentClient'
  );

  const pages = await getEntries({
    content_type: 'page',
    'fields.title': 'Gallery',
  });
  const { items, ...gallery } = await getAllEntries({
    content_type: 'gallery',
  });

  return {
    props: {
      page: pages.items[0] || {},
      gallery: {
        ...gallery,
        images: items
          ? items.map(({ image, ...fields }) => ({
              ...fields,
              ...parseItem(image),
            }))
          : [],
      },
    },
  };
};
